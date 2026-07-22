import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import RecentTransactions from "../components/recentTransactions";
import { getTransactions } from "@/app/actions/transactions";

export default async function DashboardPage() {
  const user = await currentUser();
  const transactions = await getTransactions();

  const displayName =
    user?.firstName ||
    user?.username ||
    user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
    "there";

  const income = transactions
    .filter((tx) => tx.type === "INCOME")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const expenses = transactions
    .filter((tx) => tx.type === "EXPENSE")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const balance = income - expenses;
  const savings = balance;

  const formatCurrency = (val: number) => {
    return (val < 0 ? "-" : "") + "$" + Math.abs(val).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="min-h-screen bg-slate-300 p-6">
      <div className="mx-auto max-w-7xl space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-emerald-600 font-bold">Dashboard</h1>
            <p className="text-gray-500">
              Welcome back, {displayName} 👋
            </p>
          </div>

          <Link
            href="/transactions"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
          >
            + Add Transaction
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 text-slate-400">
          <Card
            title="Balance"
            value={formatCurrency(balance)}
            icon={<Wallet />}
            color="bg-blue-500"
          />
          <Card
            title="Income"
            value={formatCurrency(income)}
            icon={<TrendingUp />}
            color="bg-emerald-500"
          />
          <Card
            title="Expenses"
            value={formatCurrency(expenses)}
            icon={<TrendingDown />}
            color="bg-red-500"
          />
          <Card
            title="Savings"
            value={formatCurrency(savings)}
            icon={<DollarSign />}
            color="bg-yellow-500"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold">Monthly Expenses</h2>
            <div className="flex h-72 items-center justify-center rounded-lg border-2 border-dashed text-gray-400">
              Chart goes here
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold">Spending by Category</h2>
            <div className="flex h-72 items-center justify-center rounded-lg border-2 border-dashed text-gray-400">
              Pie Chart
            </div>
          </div>
        </div>

        <RecentTransactions />
      </div>
    </div>
  );
}

type CardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
};

function Card({ title, value, icon, color }: CardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-800">{value}</h2>
        </div>
        <div className={`${color} rounded-full p-4 text-white`}>{icon}</div>
      </div>
    </div>
  );
}
