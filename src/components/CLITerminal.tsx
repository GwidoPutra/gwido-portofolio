import { useState, useEffect, useRef } from 'react'
import { X, Minimize, Terminal } from 'lucide-react'
import { allProjects } from 'content-collections'

type LineType = 'input' | 'output' | 'error' | 'ai'

interface TerminalLine {
  id: number
  type: LineType
  content: string
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

let lineId = 0
const nextId = () => ++lineId

const HELP_TEXT = [
  'AI Terminal v4',
  '',
  'Commands:',
  '  help     - Show this help',
  '  about    - About Gwido',
  '  projects - List projects',
  '  clear    - Clear screen',
  '',
  'Chat: ketik apa saja selain command di atas.',
  'Contoh: halo | test | Siapa Gwido?',
].join('\n')

const ABOUT_TEXT = [
  "Hello! I'm Gwido Putra Wijaya, a full-stack developer passionate about building modern web and mobile applications.",
  'I specialize in React, TypeScript, Node.js, and more. Let\'s create something amazing together!',
].join('\n')

function projectsText() {
  const list = allProjects.map((p, i) => `${i + 1}. ${p.title} - ${p.description}`).join('\n')
  return `Featured Projects:\n${list}`
}

function isShellNoise(text: string) {
  return /command\s+not\s+found|not found:|bash:|zsh:|permission denied|no such file|unknown command/i.test(
    text,
  )
}

function offlineReply(prompt: string) {
  const p = prompt.trim().toLowerCase()
  if (/^(hi|halo|hello|hey|hai|test|ping|yo|haii)$/.test(p)) {
    return 'Halo! Saya asisten portfolio Gwido. Tanya skill, project, atau cara menghubungi — silakan.'
  }
  if (/siapa|who are you|about|tentang|gwido/.test(p)) {
    return 'Gwido Putra Wijaya — Software Engineer di Malang. Full-stack (React, TypeScript, Node.js). Email: gwidoputra@gmail.com · GitHub: github.com/GwidoPutra'
  }
  if (/contact|hubungi|email|linkedin/.test(p)) {
    return 'Kontak Gwido: gwidoputra@gmail.com · LinkedIn: linkedin.com/in/gwido-putra-wijaya · GitHub: github.com/GwidoPutra'
  }
  if (/tech|stack|skill|react|node/.test(p)) {
    return 'Tech stack utama: React, TypeScript, Node.js, API design, database, system architecture. Layanan: Web, Mobile, Architecture.'
  }
  return `Saya asisten portfolio Gwido. Kamu bilang: "${prompt}". Tanya tentang skill, project, atau kontak ya.`
}

export function CLITerminal() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const [command, setCommand] = useState('')
  const [history, setHistory] = useState<TerminalLine[]>([])
  const [typing, setTyping] = useState<{ type: Exclude<LineType, 'input'>; text: string } | null>(
    null,
  )
  const [busy, setBusy] = useState(false)
  const chatRef = useRef<ChatMessage[]>([])
  const busyRef = useRef(false)
  const outputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const push = (type: LineType, content: string) => {
    setHistory((prev) => [...prev, { id: nextId(), type, content }])
  }

  const typeOut = async (text: string, type: Exclude<LineType, 'input'> = 'output') => {
    setTyping({ type, text: '' })
    for (let i = 0; i < text.length; i++) {
      await new Promise((r) => setTimeout(r, 28))
      setTyping({ type, text: text.slice(0, i + 1) })
    }
    setTyping(null)
    push(type, text)
  }

  const askAI = async (prompt: string) => {
    const thinkingId = nextId()
    setHistory((prev) => [
      ...prev,
      { id: thinkingId, type: 'output', content: 'ai> thinking...' },
    ])

    const userMsg: ChatMessage = { role: 'user', content: prompt }
    const nextChat = [...chatRef.current, userMsg].slice(-12)
    chatRef.current = nextChat

    let reply = offlineReply(prompt)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextChat.map((m) =>
            m.role === 'user'
              ? {
                  role: 'user' as const,
                  content: `This is a portfolio website chatbot message (NOT a shell command). Reply helpfully.\n\nUser: ${m.content}`,
                }
              : m,
          ),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        const ai = String(data.reply || '').trim()
        if (ai && !isShellNoise(ai)) {
          reply = ai
        }
      }
    } catch {
      // keep offline reply
    }

    setHistory((prev) => prev.filter((l) => l.id !== thinkingId))
    chatRef.current = [...nextChat, { role: 'assistant', content: reply }].slice(-12)
    await typeOut(reply, 'ai')
  }

  const handleCommand = async (cmd: string) => {
    const raw = cmd.trim()
    if (!raw || busyRef.current) return

    busyRef.current = true
    setBusy(true)
    push('input', `guest@portfolio:~$ ${cmd}`)
    setCommand('')

    try {
      const key = raw.toLowerCase()

      if (key === 'help') {
        await typeOut(HELP_TEXT, 'output')
        return
      }
      if (key === 'about') {
        await typeOut(ABOUT_TEXT, 'output')
        return
      }
      if (key === 'projects') {
        await typeOut(projectsText(), 'output')
        return
      }
      if (key === 'clear') {
        setHistory([])
        return
      }
      if (key === 'chat' || key === 'ask') {
        await typeOut(
          'Mode chat aktif. Ketik pesan apa saja, contoh: halo / test / Siapa Gwido?',
          'output',
        )
        return
      }

      const prefixed = raw.match(/^(chat|ask)\s+(.+)$/i)
      await askAI(prefixed ? prefixed[2].trim() : raw)
    } finally {
      busyRef.current = false
      setBusy(false)
      queueMicrotask(() => inputRef.current?.focus())
    }
  }

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history, typing])

  useEffect(() => {
    if (!isMinimized && !isClosed) inputRef.current?.focus()
  }, [isMinimized, isClosed, busy])

  if (isClosed) {
    return (
      <button
        onClick={() => setIsClosed(false)}
        className="fixed bottom-6 right-6 border-[3px] border-foreground bg-brutal-yellow text-brutal-ink p-3 brutal-shadow-lg hover:-translate-y-1 transition-transform z-50"
        aria-label="Open terminal"
      >
        <Terminal size={24} />
      </button>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${isMinimized ? 'w-auto' : 'w-80 h-96 sm:w-96'}`}>
      <div
        className={`bg-card border-[3px] border-foreground overflow-hidden ${isMinimized ? 'h-auto' : 'h-full'} brutal-shadow-lg`}
      >
        <div className="flex items-center justify-between px-4 py-2.5 bg-brutal-ink border-b-[3px] border-foreground">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 border-2 border-foreground bg-brutal-red" />
              <div className="w-3 h-3 border-2 border-foreground bg-brutal-yellow" />
              <div className="w-3 h-3 border-2 border-foreground bg-brutal-green" />
            </div>
            <span className="text-xs text-brutal-yellow font-mono font-black uppercase tracking-widest">AI Terminal v4</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Minimize"
            >
              <Minimize size={16} />
            </button>
            <button
              onClick={() => setIsClosed(true)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="flex flex-col h-[calc(100%-40px)] bg-background">
            <div ref={outputRef} className="flex-1 overflow-y-auto p-4 font-mono text-sm">
              <div className="text-brutal-green mb-3 text-xs font-black tracking-widest uppercase">
                ▚ AI TERMINAL v4 — chat mode on
              </div>
              <div className="text-muted-foreground mb-4 whitespace-pre-wrap font-bold">
                {`Type help, or chat freely.\nTry: halo · test · Siapa Gwido?`}
              </div>

              {history.map((line) => (
                <div
                  key={line.id}
                  className={`whitespace-pre-wrap font-bold ${
                    line.type === 'input'
                      ? 'text-brutal-blue'
                      : line.type === 'error'
                        ? 'text-brutal-red'
                        : line.type === 'ai'
                          ? 'text-brutal-green'
                          : 'text-brutal-purple'
                  }`}
                >
                  {line.type === 'ai' ? `ai> ${line.content}` : line.content}
                </div>
              ))}

              {typing && (
                <div
                  className={`whitespace-pre-wrap font-bold ${
                    typing.type === 'error'
                      ? 'text-brutal-red'
                      : typing.type === 'ai'
                        ? 'text-brutal-green'
                        : 'text-brutal-purple'
                  }`}
                >
                  {typing.type === 'ai' ? `ai> ${typing.text}` : typing.text}
                  <span className="animate-pulse">▊</span>
                </div>
              )}

              <div className="flex items-center gap-2 mt-2">
                <span className="text-brutal-blue shrink-0 font-black">guest@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      void handleCommand(command)
                    }
                  }}
                  disabled={busy || !!typing}
                  className="flex-1 bg-transparent border-b-2 border-dashed border-foreground outline-none text-foreground disabled:opacity-50 font-mono"
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
