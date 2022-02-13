const dotenv = require('dotenv');
dotenv.config();

const { Pool } = require('pg');

const {
  DB_USER: user,
  DB_DATABASE: database,
  DB_PASSWORD: password,
  DB_PORT: port,
  DB_HOST: host,
} = process.env;
const pool = new Pool({ user, database, password, port, host });

module.exports = { pool };
