import { PrismaClient } from '../src/generated/prisma/client.ts'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
  pgPool?: Pool
}

function getPool() {
  if (globalForPrisma.pgPool) return globalForPrisma.pgPool

  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }

  // Neon / managed Postgres often need SSL in production
  const needsSsl =
    process.env.NODE_ENV === 'production' ||
    /neon\.tech|supabase\.co|vercel-storage|sslmode=require/i.test(connectionString)

  const pool = new Pool({
    connectionString,
    ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
    max: 5,
  })

  globalForPrisma.pgPool = pool
  return pool
}

function getPrisma() {
  if (globalForPrisma.prisma) return globalForPrisma.prisma

  const adapter = new PrismaPg(getPool())
  const client = new PrismaClient({ adapter })
  globalForPrisma.prisma = client
  return client
}

export const prisma = getPrisma()
