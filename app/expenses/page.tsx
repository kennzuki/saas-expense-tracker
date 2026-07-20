import Link from "next/link";


export default function ExpensesPage() {
  return (
    <div className="min-h-screen bg-slate-300 p-6">
      <div className="mx-auto max-w-7xl">
       

        <div className="rounded-xl bg-white p-8 shadow">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Expenses</h1>
              <p className="text-sm text-slate-500">See where your money goes every month.</p>
            </div>
            <Link href="/dashboard" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
              Back to dashboard
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Subscriptions", amount: "$49.99" },
              { title: "Utilities", amount: "$128.40" },
              { title: "Dining", amount: "$76.20" },
              { title: "Transport", amount: "$54.10" },
            ].map((expense) => (
              <div key={expense.title} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-slate-900">{expense.title}</h2>
                  <p className="font-bold text-red-500">{expense.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
