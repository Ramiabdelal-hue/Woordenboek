import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const sentences = await prisma.sentence.findMany({
    include: { word: true },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(sentences)
}

export async function POST(request: Request) {
  const body = await request.json()

  const existing = await prisma.sentence.findFirst({ where: { dutch: body.dutch } })
  if (existing) {
    return NextResponse.json(
      { error: `De zin "${body.dutch}" bestaat al` },
      { status: 409 }
    )
  }

  const sentence = await prisma.sentence.create({
    data: {
      dutch: body.dutch,
      arabic: body.arabic,
      wordId: body.wordId || null
    }
  })
  return NextResponse.json(sentence)
}
