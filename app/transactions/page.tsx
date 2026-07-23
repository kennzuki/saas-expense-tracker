import Link from "next/link";
import AddTransactions from "../components/AddTransactions";
import TransactionsTable from "../components/TransactionsTable";
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

        </div>
      </div>
    </div>
  );
}
