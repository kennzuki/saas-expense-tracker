"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteTransaction, updateTransaction, type TransactionInput } from "@/app/actions/transactions";
import { Edit2, Trash2, X } from "lucide-react";
import { useForm } from "react-hook-form";

type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  occurredAt: Date | string;
  notes: string | null;
  category?: {
    id: string;
    name: string;
  } | null;
};

type TransactionsTableProps = {
  initialTransactions: Transaction[];
};

type EditFormValues = {
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

export default function TransactionsTable({ initialTransactions }: TransactionsTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletePendingId, setDeletePendingId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"INCOME" | "EXPENSE">("EXPENSE");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditFormValues>();

  const categoryOptions = selectedType === "INCOME" ? incomeCategories : expenseCategories;

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    setDeletePendingId(id);
    startTransition(async () => {
      const res = await deleteTransaction(id);
      setDeletePendingId(null);
      if (res.success) {
        router.refresh();
      } else {
        alert(res.error || "Failed to delete transaction");
      }
    });
  };

  const handleEditClick = (tx: Transaction) => {
    setEditingTransaction(tx);
    setSelectedType(tx.type);
    reset({
      description: tx.description,
      amount: tx.amount.toString(),
      type: tx.type,
      category: tx.category?.name || (tx.type === "INCOME" ? "Salary" : "Groceries"),
      occurredAt: new Date(tx.occurredAt).toISOString().slice(0, 10),
      notes: tx.notes || "",
    });
  };

  const onEditSubmit = async (values: EditFormValues) => {
    if (!editingTransaction) return;

    const payload: TransactionInput = {
      description: values.description,
      amount: values.amount,
      type: values.type,
      category: values.category,
      occurredAt: values.occurredAt,
      notes: values.notes,
    };

    const res = await updateTransaction(editingTransaction.id, payload);
    if (res.success) {
      setEditingTransaction(null);
      router.refresh();
    } else {
      alert(res.error || "Failed to update transaction");
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialTransactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  No transactions recorded yet. Add your first transaction above!
                </td>
              </tr>
            ) : (
              initialTransactions.map((tx) => {
                const formattedDate = new Date(tx.occurredAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });
                const isExpense = tx.type === "EXPENSE";

                return (
                  <tr key={tx.id} className="border-t border-slate-200 hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-900">{tx.description}</td>
                    <td className="px-4 py-3 text-slate-600">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                        {tx.category?.name ?? "General"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{formattedDate}</td>
                    <td
                      className={`px-4 py-3 text-right font-semibold ${
                        isExpense ? "text-red-500" : "text-emerald-600"
                      }`}
                    >
                      {isExpense ? "-" : "+"}${tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditClick(tx)}
                          className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(tx.id)}
                          disabled={deletePendingId === tx.id}
                          className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl border border-slate-100 relative">
            <button
              onClick={() => setEditingTransaction(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-semibold text-slate-900 mb-2">Edit Transaction</h3>
            <p className="text-sm text-slate-500 mb-4">Update details for this transaction.</p>

            <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-1 text-sm font-medium text-slate-700">
                  <span>Description</span>
                  <input
                    {...register("description", { required: "Description is required" })}
                    placeholder="e.g. Rent"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
                  />
                  {errors.description && (
                    <p className="text-xs text-red-500">{errors.description.message}</p>
                  )}
                </label>

                <label className="space-y-1 text-sm font-medium text-slate-700">
                  <span>Amount</span>
                  <input
                    {...register("amount", { required: "Amount is required" })}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
                  />
                  {errors.amount && (
                    <p className="text-xs text-red-500">{errors.amount.message}</p>
                  )}
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-1 text-sm font-medium text-slate-700">
                  <span>Type</span>
                  <select
                    {...register("type")}
                    onChange={(event) => {
                      const nextType = event.target.value as "INCOME" | "EXPENSE";
                      setSelectedType(nextType);
                      setValue("type", nextType);
                      setValue("category", nextType === "INCOME" ? incomeCategories[0] : expenseCategories[0]);
                    }}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
                  >
                    <option value="EXPENSE">Expense</option>
                    <option value="INCOME">Income</option>
                  </select>
                </label>

                <label className="space-y-1 text-sm font-medium text-slate-700">
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
                </label>
              </div>

              <label className="block space-y-1 text-sm font-medium text-slate-700">
                <span>Date</span>
                <input
                  {...register("occurredAt", { required: "Date is required" })}
                  type="date"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
                />
              </label>

              <label className="block space-y-1 text-sm font-medium text-slate-700">
                <span>Notes</span>
                <textarea
                  {...register("notes")}
                  rows={3}
                  placeholder="Optional details"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
                />
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingTransaction(null)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
                >
                  {isSubmitting ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
