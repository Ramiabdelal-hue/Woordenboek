import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const word = await prisma.word.findUnique({ where: { id: params.id } })
  if (!word) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(word)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()

  // check duplicate only if dutch name changed
  const existing = await prisma.word.findUnique({ where: { dutch: body.dutch } })
  if (existing && existing.id !== params.id) {
    return NextResponse.json(
      { error: `الكلمة "${body.dutch}" موجودة بالفعل في القاموس` },
      { status: 409 }
    )
  }

  const word = await prisma.word.update({
    where: { id: params.id },
    data: {
      dutch: body.dutch,
      arabicMeaning: body.arabicMeaning,
      otherMeaning: body.otherMeaning || null
    }
  })
  return NextResponse.json(word)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.word.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
