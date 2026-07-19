const transactionRows = Array.from({ length: 3 });

export default function Loading() {
  return (
    <div
      className="min-h-screen bg-slate-100 p-6"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading dashboard</span>

      <div className="mx-auto max-w-7xl space-y-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-9 w-40 rounded bg-slate-200" />
            <div className="h-5 w-48 rounded bg-slate-200" />
          </div>
          <div className="h-10 w-36 rounded-lg bg-slate-200" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-xl bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <div className="h-4 w-20 rounded bg-slate-200" />
                  <div className="h-9 w-28 rounded bg-slate-200" />
                </div>
                <div className="h-12 w-12 rounded-full bg-slate-200" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <SkeletonPanel className="lg:col-span-2" />
          <SkeletonPanel />
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow">
          <div className="border-b p-5">
            <div className="h-6 w-44 rounded bg-slate-200" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <th key={index} className="p-4">
                      <div className="h-4 w-20 rounded bg-slate-200" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactionRows.map((_, index) => (
                  <tr key={index} className="border-t">
                    {Array.from({ length: 4 }).map((_, cellIndex) => (
                      <td key={cellIndex} className="p-4">
                        <div className="h-5 w-24 rounded bg-slate-200" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonPanel({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-xl bg-white p-6 shadow ${className}`}>
      <div className="mb-4 h-6 w-44 rounded bg-slate-200" />
      <div className="h-72 rounded-lg bg-slate-200" />
    </div>
  );
}
