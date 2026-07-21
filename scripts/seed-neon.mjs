import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding dummy data to Neon/Postgres...')

  const user = await prisma.user.create({
    data: {
      clerkId: 'seed-clerk-1',
      email: 'seed@example.com',
      name: 'Seed User',
    },
  })

  const foodCategory = await prisma.category.create({
    data: {
      userId: user.id,
      name: 'Food',
      type: 'EXPENSE',
    },
  })

  const travelCategory = await prisma.category.create({
    data: {
      userId: user.id,
      name: 'Travel',
      type: 'EXPENSE',
    },
  })

  await prisma.transaction.createMany({
    data: [
      {
        userId: user.id,
        categoryId: foodCategory.id,
        description: 'Lunch at cafe',
        amount: '12.00',
        type: 'EXPENSE',
        occurredAt: new Date(),
      },
      {
        userId: user.id,
        categoryId: travelCategory.id,
        description: 'Taxi to airport',
        amount: '35.50',
        type: 'EXPENSE',
        occurredAt: new Date(),
      },
    ],
  })

  console.log('Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
