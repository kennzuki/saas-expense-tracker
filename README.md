# SaaS Expense Tracker

A full-stack expense tracking application built with Next.js 16, featuring authenticated accounts, transaction management, and spending analytics.

## Features

- **Authentication** — secure sign-up/sign-in powered by Clerk
- **Transaction management** — add, edit, delete, and categorize expenses
- **Form validation** — type-safe forms with React Hook Form + Zod
- **Analytics dashboard** — visualize spending trends with Recharts
- **Toast notifications** — real-time feedback via react-hot-toast
- **Type-safe database layer** — Prisma 7 ORM with a Neon serverless Postgres backend

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Auth | [Clerk](https://clerk.com) |
| Database | [Neon](https://neon.tech) (serverless Postgres) |
| ORM | [Prisma 7](https://www.prisma.io) |
| Forms & Validation | React Hook Form + Zod |
| Charts | Recharts |
| Styling | Tailwind CSS |

## Getting Started

### Prerequisites

- Node.js 20+
- A [Neon](https://neon.tech) Postgres database
- A [Clerk](https://clerk.com) application (for auth keys)

### Installation

```bash
git clone https://github.com/kennzuki/saas-expense-tracker.git
cd saas-expense-tracker
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_neon_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### Database Setup

```bash
npx prisma generate
npx prisma migrate dev
npm run seed:neon   # optional: seed sample data
```

### Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Roadmap

- [ ] Stripe-powered subscription tiers (free vs. premium)
- [ ] Multi-currency support
- [ ] Recurring transactions
- [ ] Export to CSV/PDF

## License

This project is for portfolio/demonstration purposes.