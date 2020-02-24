const { Pool } = require('pg');

const pool = new Pool({
  "host": "localhost",
  "port": 5432,
  "user":"sanjeevdatta",
  "database" : "calendar",
  "max": 100,
  "connectionTimeoutMillis" : 0,
  "idleTimeoutMillis": 0
})

pool.connect(err => {
  if (err) {
    console.log('Error while trying to establish connection.')
  } else {
    console.log('PostgreSQL calendar DB connected.');
  }
})

module.exports = {
  pool
}