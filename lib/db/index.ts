let pool: any = null
let db: any = null
let initialized = false

// Lazy load database only when DATABASE_URL is available
function initializeDatabase() {
  if (!initialized && process.env.DATABASE_URL) {
    initialized = true
    try {
      const { drizzle } = require('drizzle-orm/node-postgres')
      const { Pool } = require('pg')
      
      pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      })
      db = drizzle(pool)
    } catch (error) {
      console.error('[v0] Database initialization failed:', error)
    }
  }
  return db
}

// Initialize on first import if DATABASE_URL is set
if (process.env.DATABASE_URL) {
  initializeDatabase()
}

export { pool }
export { db }
export const getDb = () => initializeDatabase()
