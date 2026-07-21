import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client.ts'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const note = await prisma.guestbook.create({
  data: { name: 'Neon Test', message: 'Guestbook connected to Neon Postgres' },
})
const notes = await prisma.guestbook.findMany({ orderBy: { date: 'desc' }, take: 3 })
console.log('OK create', note.id)
console.log('OK count', notes.length)
console.log('latest', notes[0]?.name, '-', notes[0]?.message)
await prisma.$disconnect()
