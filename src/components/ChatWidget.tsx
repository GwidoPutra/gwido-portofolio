import { useEffect, useRef, useState } from 'react'
import { MessageSquare, Minimize2, Send, X } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

type Role = 'user' | 'assistant'

interface ChatMessage {
  role: Role
  content: string
}

const SUGGESTIONS = [
  'Siapa Gwido?',
  'Tech stack apa yang dikuasai?',
  'Bagaimana cara menghubungi?',
]

export function ChatWidget() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Halo! Saya asisten AI portfolio Gwido. Tanya tentang skill, project, atau cara hubungi — silakan.',
    },
  ])

  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, loading, open, minimized])

  useEffect(() => {
    if (open && !minimized) {
      inputRef.current?.focus()
    }
  }, [open, minimized])

  const sendMessage = async (raw: string) => {
    const text = raw.trim()
    if (!text || loading) return

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: text }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      const data = (await res.json()) as { reply?: string; error?: string }

      if (!res.ok) {
        throw new Error(data.error || 'Gagal menghubungi asisten')
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply?.trim() || 'Maaf, saya tidak punya jawaban saat ini.' },
      ])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan'
      setError(message)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Maaf, koneksi ke asisten gagal. Coba lagi sebentar, atau hubungi Gwido lewat halaman Kontak.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void sendMessage(input)
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => {
          setOpen(true)
          setMinimized(false)
        }}
        aria-label="Buka chat asisten"
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 ${
          isDark
            ? 'bg-blue-600 text-white shadow-blue-900/40 hover:bg-blue-500'
            : 'bg-slate-900 text-white shadow-slate-900/20 hover:bg-slate-800'
        }`}
      >
        <MessageSquare size={22} />
      </button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden border shadow-2xl transition-all ${
        minimized ? 'h-12 w-72' : 'h-[min(32rem,calc(100vh-3rem))] w-[min(24rem,calc(100vw-1.5rem))]'
      } ${
        isDark
          ? 'border-slate-700 bg-slate-950 text-slate-100'
          : 'border-slate-200 bg-[#fafafa] text-slate-900'
      }`}
      style={{ borderRadius: 12 }}
    >
      <div
        className={`flex h-12 shrink-0 items-center justify-between border-b px-3 ${
          isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
        }`}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-md ${
              isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-slate-900 text-white'
            }`}
          >
            <MessageSquare size={14} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight">Asisten Portfolio</p>
            <p className={`truncate text-[11px] leading-tight ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Tanya tentang Gwido
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMinimized((v) => !v)}
            className={`rounded-md p-1.5 transition-colors ${
              isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
            }`}
            aria-label={minimized ? 'Perbesar chat' : 'Minimize chat'}
          >
            <Minimize2 size={15} />
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className={`rounded-md p-1.5 transition-colors ${
              isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
            }`}
            aria-label="Tutup chat"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {!minimized && (
        <>
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {messages.map((msg, i) => (
              <div
                key={`${msg.role}-${i}`}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap px-3 py-2 text-[13px] leading-relaxed ${
                    msg.role === 'user'
                      ? isDark
                        ? 'rounded-2xl rounded-br-md bg-blue-600 text-white'
                        : 'rounded-2xl rounded-br-md bg-slate-900 text-white'
                      : isDark
                        ? 'rounded-2xl rounded-bl-md border border-slate-800 bg-slate-900 text-slate-200'
                        : 'rounded-2xl rounded-bl-md border border-slate-200 bg-white text-slate-800'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div
                  className={`rounded-2xl rounded-bl-md border px-3 py-2 text-[13px] ${
                    isDark
                      ? 'border-slate-800 bg-slate-900 text-slate-400'
                      : 'border-slate-200 bg-white text-slate-500'
                  }`}
                >
                  <span className="inline-flex gap-1">
                    <span className="animate-pulse">●</span>
                    <span className="animate-pulse [animation-delay:120ms]">●</span>
                    <span className="animate-pulse [animation-delay:240ms]">●</span>
                  </span>
                </div>
              </div>
            )}

            {messages.length <= 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void sendMessage(s)}
                    className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                      isDark
                        ? 'border-slate-700 bg-slate-900 text-slate-300 hover:border-blue-500 hover:text-blue-300'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {error && (
            <p className={`px-3 pb-1 text-[11px] ${isDark ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
          )}

          <div
            className={`border-t p-2 ${
              isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white'
            }`}
          >
            <div
              className={`flex items-end gap-2 rounded-lg border px-2 py-1.5 ${
                isDark ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-[#fafafa]'
              }`}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                maxLength={1000}
                placeholder="Tanya sesuatu..."
                className={`max-h-24 min-h-[36px] flex-1 resize-none bg-transparent py-1.5 text-[13px] outline-none ${
                  isDark
                    ? 'text-slate-100 placeholder:text-slate-500'
                    : 'text-slate-900 placeholder:text-slate-400'
                }`}
              />
              <button
                type="button"
                onClick={() => void sendMessage(input)}
                disabled={loading || !input.trim()}
                aria-label="Kirim pesan"
                className={`mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors disabled:opacity-40 ${
                  isDark
                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <Send size={14} />
              </button>
            </div>
            <p className={`mt-1.5 px-1 text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              Enter kirim · Shift+Enter baris baru
            </p>
          </div>
        </>
      )}
    </div>
  )
}
