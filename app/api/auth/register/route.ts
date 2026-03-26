import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (!username || !password || password.length < 4) {
    return NextResponse.json({ error: 'Wachtwoord moet minimaal 4 tekens zijn' }, { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { username } })
  if (existing) {
    return NextResponse.json({ error: 'Gebruikersnaam al in gebruik' }, { status: 409 })
  }

  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      username,
      password: hashed
    }
  })

  return NextResponse.json({ id: user.id, username: user.username })
}
