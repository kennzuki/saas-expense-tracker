import Link from "next/link";
import { Navbar } from "../components/navbar";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-slate-300 p-6">
      <div className="mx-auto max-w-7xl">
        <Navbar />

        <div className="rounded-xl bg-white p-8 shadow">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Categories</h1>
              <p className="text-sm text-slate-500">Organize your spending by category.</p>
            </div>
            <Link href="/dashboard" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
              Back to dashboard
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { name: "Food", amount: "$320" },
              { name: "Travel", amount: "$180" },
              { name: "Entertainment", amount: "$95" },
            ].map((category) => (
              <div key={category.name} className="rounded-lg border border-slate-200 p-4">
                <h2 className="font-semibold text-slate-900">{category.name}</h2>
                <p className="mt-2 text-sm text-slate-500">Spent this month</p>
                <p className="text-2xl font-bold text-emerald-600">{category.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
