// const mysql = require("mysql"); 

// const db = mysql.createConnection({ 
//   host: "localhost",
//   user: "root",
//   password: "Mysql@1234",
//   database: "category_db"
// });

// db.connect((err) => {  
//   if (err) throw err;
//   console.log("MySQL Connected");
// });

// module.exports = db;  

// require("dotenv").config();
const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;


