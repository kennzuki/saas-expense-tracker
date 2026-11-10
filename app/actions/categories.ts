"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import type { TransactionType } from "@/generated/prisma/client";

export async function getCategories(type: TransactionType) {
  try {
    let clerkId: string | null = null;
    try {
      const authObj = await auth();
      clerkId = authObj.userId;
    } catch {
      // Outside Clerk context
    }

    const effectiveClerkId = clerkId ?? "demo-user";

    const user = await prisma.user.findUnique({
      where: { clerkId: effectiveClerkId },
    });

    if (!user) {
      return [];
    }

    const categories = await prisma.category.findMany({
      where: {
        userId: user.id,
        type: type,
      },
      include: {
        transactions: true,
      },
    });

    return categories.map((cat) => ({
      ...cat,
      transactions: cat.transactions.map((tx) => ({
        ...tx,
        amount: Number(tx.amount),
      })),
    }));
  } catch (error) {
    console.error("getCategories failed:", error);
    return [];
  }
}
