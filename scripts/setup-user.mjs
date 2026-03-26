import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } }
})

async function main() {
  const hashed = await bcrypt.hash('321', 10)

  // Update the default_user to Rami
  await prisma.user.update({
    where: { id: 'default_user' },
    data: { username: 'Rami', password: hashed }
  })

  console.log('✅ User updated: Rami / 321')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
