import Link from "next/link";

export default function TransactionsPage() {
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

          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="px-4 py-3">Salary</td>
                  <td className="px-4 py-3">12 Jul</td>
                  <td className="px-4 py-3 font-semibold text-emerald-600">+$3,200</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-4 py-3">Groceries</td>
                  <td className="px-4 py-3">8 Jul</td>
                  <td className="px-4 py-3 font-semibold text-red-500">-$85</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
