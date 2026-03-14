import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const words = await prisma.word.findMany({
    include: { sentences: true }
  })
  return NextResponse.json(words)
}

export async function POST(request: Request) {
  const body = await request.json()

  const existing = await prisma.word.findUnique({ where: { dutch: body.dutch } })
  if (existing) {
    return NextResponse.json(
      { error: `الكلمة "${body.dutch}" موجودة بالفعل في القاموس` },
      { status: 409 }
    )
  }

  const word = await prisma.word.create({
    data: {
      dutch: body.dutch,
      arabicMeaning: body.arabicMeaning,
      otherMeaning: body.otherMeaning || null
    }
  })
  return NextResponse.json(word)
}
