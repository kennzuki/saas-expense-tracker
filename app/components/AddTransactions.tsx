"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { createTransaction, type TransactionInput } from "@/app/actions/transactions";

type TransactionFormValues = {
  description: string;
  amount: string;
  type: "INCOME" | "EXPENSE";
  category: string;
  occurredAt: string;
  notes: string;
};

const incomeCategories = ["Salary", "Freelance", "Bonus", "Refund", "Other Income"];
const expenseCategories = [
  "Groceries",
  "Dining",
  "Transport",
  "Rent",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Other Expense",
];

const defaultValues: TransactionFormValues = {
  description: "",
  amount: "",
  type: "EXPENSE",
  category: "Groceries",
  occurredAt: new Date().toISOString().slice(0, 10),
  notes: "",
};

export default function AddTransactions() {
  const [selectedType, setSelectedType] = useState<TransactionFormValues["type"]>(
    defaultValues.type,
  );
  const [isPending, startTransition] = useTransition();
  const [banner, setBanner] = useState<{ type: "success" | "error"; message: string } | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    defaultValues,
  });

  const categoryOptions = selectedType === "INCOME" ? incomeCategories : expenseCategories;

  const onSubmit = (values: TransactionFormValues) => {
    setBanner(null);

    const payload: TransactionInput = {
      description: values.description,
      amount: values.amount,
      type: values.type,
      category: values.category,
      occurredAt: values.occurredAt,
      notes: values.notes,
    };

    startTransition(async () => {
      const result = await createTransaction(payload);

      if (!result.success) {
        setBanner({ type: "error", message: result.error });

        if (result.fieldErrors) {
          for (const [field, messages] of Object.entries(result.fieldErrors)) {
            if (messages?.[0]) {
              setError(field as keyof TransactionFormValues, { message: messages[0] });
            }
          }
        }
        return;
      }

      setBanner({ type: "success", message: "Transaction saved." });
      reset({ ...defaultValues, type: selectedType, category: values.category });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Add transaction</h2>
        <p className="text-sm text-slate-500">
          Capture the key fields from your transaction model: description, amount, type,
          category, date, and notes.
        </p>
      </div>

      {banner ? (
        <div
          className={`rounded-lg px-3 py-2 text-sm ${
            banner.type === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {banner.message}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Description</span>
          <input
            {...register("description")}
            placeholder="e.g. Groceries"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-emerald-500"
          />
          {errors.description ? (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          ) : null}
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Amount</span>
          <input
            {...register("amount")}
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-emerald-500"
          />
          {errors.amount ? (
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          ) : null}
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Type</span>
          <select
            {...register("type")}
            onChange={(event) => {
              const nextType = event.target.value as TransactionFormValues["type"];
              setSelectedType(nextType);
              setValue("type", nextType, { shouldValidate: true });
              setValue(
                "category",
                nextType === "INCOME" ? incomeCategories[0] : expenseCategories[0],
              );
            }}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
          >
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Category</span>
          <select
            {...register("category")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.category ? (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          ) : null}
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium text-slate-700">
        <span>Date</span>
        <input
          {...register("occurredAt")}
          type="date"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
        />
        {errors.occurredAt ? (
          <p className="text-sm text-red-500">{errors.occurredAt.message}</p>
        ) : null}
      </label>

      <label className="space-y-2 text-sm font-medium text-slate-700">
        <span>Notes</span>
        <textarea
          {...register("notes")}
          rows={4}
          placeholder="Optional details"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
        />
      </label>

      <div className="flex items-center justify-between gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Save transaction"}
        </button>
      </div>
    </form>
  );
}