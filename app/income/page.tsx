import Link from "next/link";
import { getTransactions } from "@/app/actions/transactions";

export default async function IncomePage() {
  const allTransactions = await getTransactions();
  const incomeTransactions = allTransactions.filter(
    (tx) => tx.type === "INCOME"
  );

  const totalIncome = incomeTransactions.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );

  return (
    <div className="min-h-screen bg-slate-300 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-xl bg-white p-8 shadow">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Income</h1>
              <p className="text-sm text-slate-500">
                All your income sources at a glance.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Back to dashboard
            </Link>
          </div>

          {/* Summary banner */}
          <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-medium text-emerald-700">Total Income</p>
            <p className="text-2xl font-bold text-emerald-600">
              ${totalIncome.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-xs text-emerald-500">
              {incomeTransactions.length}{" "}
              {incomeTransactions.length === 1 ? "transaction" : "transactions"}
            </p>
          </div>

          {/* Income cards */}
          {incomeTransactions.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-slate-200 py-12 text-center">
              <p className="text-lg font-medium text-slate-400">
                No income recorded yet
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Add income transactions to see them here.
              </p>
              <Link
                href="/transactions"
                className="mt-4 inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Add transaction
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {incomeTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="group rounded-lg border border-slate-200 p-4 transition hover:border-emerald-300 hover:shadow-md"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <h2 className="font-semibold text-slate-900">
                      {tx.description}
                    </h2>
                    <p className="whitespace-nowrap font-bold text-emerald-600">
                      +$
                      {tx.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-medium text-emerald-700">
                      {tx.category?.name ?? "Uncategorized"}
                    </span>
                    <span>
                      {new Date(tx.occurredAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {tx.notes ? (
                    <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                      {tx.notes}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
