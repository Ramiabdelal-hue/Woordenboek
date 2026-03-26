'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (mode === 'register') {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error)
        setLoading(false)
        return
      }
    }

    const result = await signIn('credentials', {
      username, password, redirect: false
    })

    if (result?.error) {
      setError(`فشل تسجيل الدخول: ${result.error}`)
    } else if (!result?.ok) {
      setError('حدث خطأ غير متوقع، حاول مرة أخرى')
    } else {
      router.push('/')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">📚</div>
        <h1 className="login-title">Woordenboek</h1>
        <p className="login-subtitle">Nederlands - Arabisch</p>

        <div className="login-tabs">
          <button
            className={`login-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setError('') }}
          >
            Inloggen
          </button>
          <button
            className={`login-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => { setMode('register'); setError('') }}
          >
            Registreren
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-banner">⚠️ {error}</div>}

          <div className="form-group">
            <label>Gebruikersnaam</label>
            <input
              type="text"
              required
              placeholder="Jouw gebruikersnaam"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label>Wachtwoord</label>
            <input
              type="password"
              required
              placeholder="Jouw wachtwoord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '⏳ Even wachten...' : mode === 'login' ? '🔑 Inloggen' : '✅ Account aanmaken'}
          </button>
        </form>
      </div>
    </div>
  )
}
