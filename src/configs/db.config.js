require("dotenv").config();
const mysql = require("mysql2");
const fs = require("fs");

const pool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "code_buddy",
  port: process.env.DB_PORT || 3306,
  // ssl: {
  //   mode: 'VERIFY_IDENTITY',
  //   ca: fs.readFileSync('/etc/ssl/cert.pem', 'utf-8'),
  // }
});

pool.connect((err, connection) => {
  if (err) throw err;
  console.log("Database connected successfully");
});

module.exports = pool;

