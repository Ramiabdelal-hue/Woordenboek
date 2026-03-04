import Link from 'next/link'

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">قاموس هولندي - عربي</h1>
        <p className="hero-subtitle">تعلم اللغة الهولندية بطريقة سهلة وممتعة</p>
      </div>

      <div className="features-grid">
        <Link href="/words" className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>الكلمات</h3>
          <p>تصفح جميع الكلمات المحفوظة</p>
        </Link>

        <Link href="/words/add" className="feature-card">
          <div className="feature-icon">➕</div>
          <h3>إضافة كلمة</h3>
          <p>أضف كلمات جديدة للقاموس</p>
        </Link>

        <Link href="/sentences" className="feature-card">
          <div className="feature-icon">💬</div>
          <h3>الجمل</h3>
          <p>تعلم من خلال الجمل والأمثلة</p>
        </Link>

        <Link href="/quiz" className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>الامتحانات</h3>
          <p>اختبر معلوماتك وتقدمك</p>
        </Link>
      </div>
    </div>
  )
}
