import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

// Create a pool even if DATABASE_URL is not set, but it will fail at runtime
// This allows the app to load without crashing during build time
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost/ikaq',
})

export const db = drizzle(pool)
