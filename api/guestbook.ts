import { prisma } from './prisma.ts'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(iso: string) {
  const d = new Date(iso)
  const month = MONTHS[d.getMonth()]
  const day = d.getDate()
  const hours = d.getHours().toString().padStart(2, '0')
  const minutes = d.getMinutes().toString().padStart(2, '0')
  return `${month} ${day}, ${hours}:${minutes}`
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method === 'GET') {
    const notes = await prisma.guestbook.findMany({ orderBy: { date: 'desc' } })
    res.status(200).json({
      notes: notes.map((n) => ({ ...n, formattedDate: formatDate(n.date.toISOString()) })),
    })
    return
  }

  if (req.method === 'POST') {
    try {
      const { name, message } = req.body

      if (!name || !message) {
        res.status(400).json({ error: 'Name and message are required' })
        return
      }

      const trimmedName = name.trim().slice(0, 50)
      const trimmedMessage = message.trim().slice(0, 500)

      if (!trimmedName || !trimmedMessage) {
        res.status(400).json({ error: 'Name and message cannot be empty' })
        return
      }

      const note = await prisma.guestbook.create({
        data: { name: trimmedName, message: trimmedMessage },
      })

      res.status(201).json({
        note: {
          ...note,
          formattedDate: formatDate(note.date.toISOString()),
        },
      })
    } catch (err) {
      res.status(500).json({ error: 'Failed to save note' })
    }
    return
  }

  res.status(405).json({ error: 'Method not allowed' })
}
