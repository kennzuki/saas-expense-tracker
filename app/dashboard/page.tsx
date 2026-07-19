import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-300 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-green-500 font-bold">Dashboard</h1>
            <p className="text-gray-500">Welcome back, Ken 👋</p>
          </div>

          <button className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
            + Add Transaction
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 text-slate-400">
          <Card
            title="Balance"
            value="$14,320"
            icon={<Wallet />}
            color="bg-blue-500"
          />
          <Card
            title="Income"
            value="$9,850"
            icon={<TrendingUp />}
            color="bg-green-500"
          />
          <Card
            title="Expenses"
            value="$4,530"
            icon={<TrendingDown />}
            color="bg-red-500"
          />
          <Card
            title="Savings"
            value="$5,320"
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

        <div className="overflow-hidden rounded-xl bg-white shadow">
          <div className="border-b p-5">
            <h2 className="text-lg text-green-500 font-semibold">Recent Transactions</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-slate-900">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-left">Category</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <Row
                  description="Netflix"
                  category="Entertainment"
                  date="12 Jul"
                  amount="-15.99"
                  expense
                />
                <Row
                  description="Salary"
                  category="Income"
                  date="10 Jul"
                  amount="+3200"
                />
                <Row
                  description="Groceries"
                  category="Food"
                  date="8 Jul"
                  amount="-85.00"
                  expense
                />
              </tbody>
            </table>
          </div>
        </div>
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
          <h2 className="mt-2 text-3xl font-bold">{value}</h2>
        </div>
        <div className={`${color} rounded-full p-4 text-white`}>{icon}</div>
      </div>
    </div>
  );
}

type RowProps = {
  description: string;
  category: string;
  date: string;
  amount: string;
  expense?: boolean;
};

function Row({ description, category, date, amount, expense }: RowProps) {
  return (
    <tr className="border-t font-normal text-slate-900">
      <td className="p-4">{description}</td>
      <td className="p-4">{category}</td>
      <td className="p-4">{date}</td>
      <td
        className={`p-4 text-right font-semibold ${
          expense ? "text-red-500" : "text-green-600"
        }`}
      >
        {amount}
      </td>
    </tr>
  );
}
