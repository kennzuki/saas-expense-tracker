import Link from "next/link";
import AddTransactions from "../components/AddTransactions";
import { getTransactions } from "@/app/actions/transactions";

export default async function TransactionsPage() {
  const transactions = await getTransactions();

  return (
    <div className="min-h-screen bg-slate-300 p-6">
      <div className="mx-auto max-w-7xl">

        <div className="rounded-xl bg-white p-8 shadow">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Transactions</h1>
              <p className="text-sm text-slate-500">Track money moving in and out.</p>
            </div>
            <Link href="/dashboard" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
              Back to dashboard
            </Link>
          </div>

          <div className="mb-6">
            <AddTransactions />
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500">
                      No transactions recorded yet. Add your first transaction above!
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx) => {
                    const formattedDate = new Date(tx.occurredAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    });
                    const isExpense = tx.type === "EXPENSE";

                    return (
                      <tr key={tx.id} className="border-t border-slate-200 hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-medium text-slate-900">{tx.description}</td>
                        <td className="px-4 py-3 text-slate-600">{tx.category?.name ?? "General"}</td>
                        <td className="px-4 py-3 text-slate-500">{formattedDate}</td>
                        <td
                          className={`px-4 py-3 text-right font-semibold ${
                            isExpense ? "text-red-500" : "text-emerald-600"
                          }`}
                        >
                          {isExpense ? "-" : "+"}${tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
