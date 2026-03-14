import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import SpeakButton from '@/components/SpeakButton'
import NavBar from '@/components/NavBar'

export const dynamic = 'force-dynamic'

export default async function SentencesPage() {
  const sentences = await prisma.sentence.findMany({
    include: { word: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="page-container">
      <NavBar title="💬 الجمل" />
      <div className="page-header">
        <h1 className="page-title">💬 قائمة الجمل</h1>
      </div>

      <div className="words-container">
        <div className="search-section">
          <Link href="/sentences/add" className="btn btn-primary">
            ➕ إضافة جملة جديدة
          </Link>
        </div>

        <div className="word-list">
          {sentences.length === 0 ? (
            <div className="no-results">😕 لا توجد جمل بعد</div>
          ) : (
            sentences.map((sentence) => (
              <div key={sentence.id} className="word-card">
                <div className="word-header">
                  <h3 className="word-dutch">{sentence.dutch}</h3>
                  <SpeakButton text={sentence.dutch} lang="nl-NL" />
                </div>
                <div className="word-content">
                  <p className="word-arabic">
                    <span className="label">🇸🇦 الترجمة:</span>
                    {sentence.arabic}
                  </p>
                  <p className="word-other">
                    <span className="label">📚 الكلمة:</span>
                    {sentence.word.dutch}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
