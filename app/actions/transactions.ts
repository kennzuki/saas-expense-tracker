"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

// Mirrors the fields in your Prisma Transaction model.
const transactionSchema = z.object({
  description: z.string().trim().min(1, "Description is required").max(200),
  amount: z.coerce.number({ message: "Amount must be a number" }).positive("Amount must be greater than 0"),
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string().trim().min(1, "Category is required"),
  occurredAt: z.coerce.date({ message: "Enter a valid date" }),
  notes: z
    .string()
    .max(1000, "Notes must be under 1000 characters")
    .optional()
    .or(z.literal("")),
});

export type TransactionInput = z.input<typeof transactionSchema>;

export type ActionResult =
  | { success: true; id: string }
  | {
      success: false;
      error: string;
      fieldErrors?: Partial<Record<keyof TransactionInput, string[]>>;
    };

export async function createTransaction(input: TransactionInput): Promise<ActionResult> {
  const parsed = transactionSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    let clerkId: string | null = null;
    try {
      const authObj = await auth();
      clerkId = authObj.userId;
    } catch {
      // If called outside Clerk request context, clerkId stays null
    }

    const effectiveClerkId = clerkId ?? "demo-user";

    // 1. Upsert User in database
    const user = await prisma.user.upsert({
      where: { clerkId: effectiveClerkId },
      update: {},
      create: {
        clerkId: effectiveClerkId,
        email: clerkId ? undefined : "demo@example.com",
        name: clerkId ? "User" : "Demo User",
      },
    });

    // 2. Upsert Category for this user
    const categoryRecord = await prisma.category.upsert({
      where: {
        userId_name_type: {
          userId: user.id,
          name: parsed.data.category,
          type: parsed.data.type,
        },
      },
      update: {},
      create: {
        userId: user.id,
        name: parsed.data.category,
        type: parsed.data.type,
      },
    });

    // 3. Create Transaction in Neon database
    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        categoryId: categoryRecord.id,
        description: parsed.data.description,
        amount: parsed.data.amount,
        type: parsed.data.type,
        occurredAt: parsed.data.occurredAt,
        notes: parsed.data.notes ? parsed.data.notes : null,
      },
      select: { id: true },
    });

    // Tag-based invalidation (Next.js 16)
    try {
      revalidateTag("transactions", "max");
    } catch {
      // Outside Next.js request context, revalidateTag is a no-op
    }

    return { success: true, id: transaction.id };
  } catch (err) {
    console.error("createTransaction failed:", err);
    return {
      success: false,
      error: "Couldn't save the transaction. Please try again.",
    };
  }
}