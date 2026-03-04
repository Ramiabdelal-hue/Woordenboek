import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import SpeakButton from '@/components/SpeakButton'

export const dynamic = 'force-dynamic'

export default async function SentencesPage() {
  const sentences = await prisma.sentence.findMany({
    include: { word: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="container">
      <h1 className="header">قائمة الجمل</h1>
      <nav className="nav">
        <Link href="/">الرئيسية</Link>
        <Link href="/sentences/add">إضافة جملة جديدة</Link>
      </nav>
      
      <div className="word-list">
        {sentences.map((sentence) => (
          <div key={sentence.id} className="word-item">
            <h3>{sentence.dutch}</h3>
            <p><strong>الترجمة:</strong> {sentence.arabic}</p>
            <p><strong>الكلمة المرتبطة:</strong> {sentence.word.dutch}</p>
            <SpeakButton text={sentence.dutch} lang="nl-NL" />
          </div>
        ))}
      </div>
    </div>
  )
}
