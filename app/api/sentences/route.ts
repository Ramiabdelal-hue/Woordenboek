import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()
  const sentence = await prisma.sentence.create({
    data: {
      dutch: body.dutch,
      arabic: body.arabic,
      wordId: body.wordId
    }
  })
  return NextResponse.json(sentence)
}
