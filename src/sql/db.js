const mssql = require('mssql');

const mssqlConfig = {
  user: 'user',
  password: 'password',
  server: 'localhost',
  port: 1433,
  database: 'DunderMifflin',
};

let pool;

async function getPool() {
  if (!pool) {
    try {
      pool = await new mssql.ConnectionPool(mssqlConfig);
    } catch (err) {
      console.log('ERROR: creating new pool SQL error', err.message, err);
    }
  }
  if (!pool.pool || pool.pool.destroyed) {
    try {
      await pool.connect();
    } catch (err) {
      console.log('ERROR: connecting pool SQL error', err.message, err);
    }
  }
  return pool;
}

async function closePool() {
  return pool.close();
}

module.exports = { mssql, getPool, closePool };
