import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {currentYear} Expense Tracker. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/dashboard" className="transition hover:text-slate-900">
            Dashboard
          </Link>
          <Link href="/expenses" className="transition hover:text-slate-900">
            Expenses
          </Link>
          <Link href="/categories" className="transition hover:text-slate-900">
            Categories
          </Link>
        </div>
      </div>
    </footer>
  );
}
