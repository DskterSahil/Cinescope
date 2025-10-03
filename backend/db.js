import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: 'avnadmin',
  host: 'pg-ef7f49a-dskterplays-fc75.e.aivencloud.com',
  database: 'cinescopedb',
  password: 'AVNS_tIQzL9oi3DAWd9A7Ua7',
  port: 13663,
  ssl: {
    rejectUnauthorized: false  // important for Render SSL connection
  }
});

export default pool;
