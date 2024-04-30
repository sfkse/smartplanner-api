require("dotenv").config();
const mysql = require("mysql2");

let pool;
try {
  pool = mysql
    .createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "smartplanner",
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    })
    .promise();
  console.log("Database connection successful");
} catch (error) {
  console.log("Error when connectiong to db: " + error);
}

module.exports = pool;

