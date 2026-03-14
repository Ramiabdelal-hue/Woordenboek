'use client'

interface SpeakButtonProps {
  text: string
  lang: string
}

export default function SpeakButton({ text, lang }: SpeakButtonProps) {
  const speak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <button onClick={speak} className="btn btn-speak" aria-label="استمع للنطق">
      🎧
    </button>
  )
}
