import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })

  const word = await prisma.word.findFirst({ where: { id: params.id, userId: session.user.id } })
  if (!word) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(word)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })

  const body = await request.json()
  const existing = await prisma.word.findFirst({
    where: { dutch: body.dutch, userId: session.user.id }
  })
  if (existing && existing.id !== params.id) {
    return NextResponse.json({ error: `Het woord "${body.dutch}" bestaat al` }, { status: 409 })
  }

  const word = await prisma.word.update({
    where: { id: params.id },
    data: { dutch: body.dutch, arabicMeaning: body.arabicMeaning, otherMeaning: body.otherMeaning || null }
  })
  return NextResponse.json(word)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })

  await prisma.word.deleteMany({ where: { id: params.id, userId: session.user.id } })
  return NextResponse.json({ success: true })
}
