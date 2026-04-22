const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "db",
    user: "root",
    password: "my-super-secret",
    database: "Products",
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool.promise();
