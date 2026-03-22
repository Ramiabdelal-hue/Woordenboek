import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const body = await request.json()
  const sentence = await prisma.sentence.create({
    data: {
      dutch: body.dutch,
      arabic: body.arabic,
      wordId: body.wordId || null
    }
  })
  return NextResponse.json(sentence)
}
