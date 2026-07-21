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

function sendJson(res: any, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.statusCode = 200
    res.end()
    return
  }

  if (req.method === 'GET') {
    try {
      const notes = await prisma.guestbook.findMany({ orderBy: { date: 'desc' } })
      sendJson(res, 200, {
        notes: notes.map((n) => ({
          ...n,
          formattedDate: formatDate(n.date.toISOString()),
        })),
      })
    } catch (err) {
      console.error('Guestbook GET error:', err)
      sendJson(res, 500, { error: 'Failed to load notes' })
    }
    return
  }

  if (req.method === 'POST') {
    try {
      const { name, message } = req.body ?? {}

      if (!name || !message) {
        sendJson(res, 400, { error: 'Name and message are required' })
        return
      }

      const trimmedName = String(name).trim().slice(0, 50)
      const trimmedMessage = String(message).trim().slice(0, 500)

      if (!trimmedName || !trimmedMessage) {
        sendJson(res, 400, { error: 'Name and message cannot be empty' })
        return
      }

      const note = await prisma.guestbook.create({
        data: { name: trimmedName, message: trimmedMessage },
      })

      sendJson(res, 201, {
        note: {
          ...note,
          formattedDate: formatDate(note.date.toISOString()),
        },
      })
    } catch (err) {
      console.error('Guestbook POST error:', err)
      sendJson(res, 500, { error: 'Failed to save note' })
    }
    return
  }

  sendJson(res, 405, { error: 'Method not allowed' })
}
