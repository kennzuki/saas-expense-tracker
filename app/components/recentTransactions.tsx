import { getTransactions } from "@/app/actions/transactions";
import Link from "next/link";

export default async function RecentTransactions() {
  const transactions = await getTransactions();

  const recentTransactions = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.occurredAt).getTime() -
        new Date(a.occurredAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className="rounded-xl bg-white p-6 shadow border border-slate-100">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Recent Transactions</h2>
        <Link
          href="/transactions"
          className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((tx) => {
                const isExpense = tx.type === "EXPENSE";
                const formattedDate = new Date(tx.occurredAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-900">{tx.description}</td>
                    <td className="px-4 py-3">
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
                      {isExpense ? "-" : "+"}${tx.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-400">
                  No recent transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
