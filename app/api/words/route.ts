import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const words = await prisma.word.findMany({
    include: { sentences: true }
  })
  return NextResponse.json(words)
}

export async function POST(request: Request) {
  const body = await request.json()
  const word = await prisma.word.create({
    data: {
      dutch: body.dutch,
      arabicMeaning: body.arabicMeaning,
      otherMeaning: body.otherMeaning || null
    }
  })
  return NextResponse.json(word)
}
