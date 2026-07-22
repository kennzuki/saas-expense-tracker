import Link from "next/link";
import { getCategories } from "@/app/actions/categories";
import { ArrowDownLeft, ArrowUpRight, Tag } from "lucide-react";

export default async function CategoriesPage() {
  const incomeCategories = await getCategories("INCOME");
  const expenseCategories = await getCategories("EXPENSE");

  return (
    <div className="min-h-screen bg-slate-300 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Header */}
        <div className="rounded-xl bg-white p-8 shadow">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Categories</h1>
              <p className="text-sm text-slate-500">Organize and monitor your transactions by category.</p>
            </div>
            <Link href="/dashboard" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
              Back to dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Income Categories Section */}
          <div className="rounded-xl bg-white p-6 shadow space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
                <ArrowUpRight className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Income Categories</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {incomeCategories.length > 0 ? (
                incomeCategories.map((cat) => {
                  const total = cat.transactions.reduce((sum, tx) => sum + tx.amount, 0);
                  return (
                    <div key={cat.id} className="rounded-lg border border-slate-200 p-4 hover:border-emerald-500 hover:shadow-sm transition-all duration-200">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-emerald-600" />
                        <h3 className="font-semibold text-slate-900">{cat.name}</h3>
                      </div>
                      <p className="mt-2 text-xs text-slate-500">{cat.transactions.length} transactions</p>
                      <p className="text-xl font-bold text-emerald-600 mt-1">
                        +${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-8 text-center text-slate-400 text-sm">
                  No income categories found.
                </div>
              )}
            </div>
          </div>

          {/* Expense Categories Section */}
          <div className="rounded-xl bg-white p-6 shadow space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <div className="rounded-full bg-red-100 p-2 text-red-600">
                <ArrowDownLeft className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Expense Categories</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {expenseCategories.length > 0 ? (
                expenseCategories.map((cat) => {
                  const total = cat.transactions.reduce((sum, tx) => sum + tx.amount, 0);
                  return (
                    <div key={cat.id} className="rounded-lg border border-slate-200 p-4 hover:border-red-500 hover:shadow-sm transition-all duration-200">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-red-500" />
                        <h3 className="font-semibold text-slate-900">{cat.name}</h3>
                      </div>
                      <p className="mt-2 text-xs text-slate-500">{cat.transactions.length} transactions</p>
                      <p className="text-xl font-bold text-red-500 mt-1">
                        -${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-8 text-center text-slate-400 text-sm">
                  No expense categories found.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
