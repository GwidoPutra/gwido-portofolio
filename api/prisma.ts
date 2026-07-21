import { PrismaClient } from '../src/generated/prisma/client.ts'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import Database from 'better-sqlite3'
import path from 'path'

const dbPath = process.env.DATABASE_URL?.replace('file:', '') || path.join(process.cwd(), 'prisma', 'dev.db')
const connection = new Database(dbPath)
const adapter = new PrismaBetterSqlite3(connection)

export const prisma = new PrismaClient({ adapter })
