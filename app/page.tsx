
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();
  const isSignedIn = Boolean(userId);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-between gap-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-black sm:items-start">
        <div className="flex w-full items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
              SaaS Expense Tracker
            </p>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-white sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              <span className="block">Take control of your spending</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <>
                <SignInButton />
                <SignUpButton />
              </>
            )}
          </div>
        </div>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
          Sign in to start tracking expenses, reviewing trends, and keeping your team aligned.
        </p>
      </main>
    </div>
  );
}
