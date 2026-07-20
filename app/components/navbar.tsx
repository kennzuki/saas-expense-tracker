import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/categories", label: "Categories" },
  { href: "/transactions", label: "Transactions" },
  { href: "/expenses", label: "Expenses" },
];

export function Navbar() {
  return (
    <nav className="mb-6 rounded-xl bg-slate-900/95 px-4 py-3 shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <Link href="/dashboard" className="text-lg font-semibold text-white">
          Expense Tracker
        </Link>

        <div className="flex flex-wrap gap-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
