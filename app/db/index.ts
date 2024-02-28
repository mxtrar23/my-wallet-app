const { Client } = require('@vercel/postgres');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

export async function query(sql: string, params?: any[] | undefined) {
  await client.connect();
  const results = await client.query(sql, params);
  await client.end();
  return results.rows;
}