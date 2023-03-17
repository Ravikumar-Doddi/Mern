const mysql = require("mysql");

const config = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "mern-stack-database",
};

const connection = mysql.createConnection(config);

connection.connect((error) => {
  if (!error) {
    console.log("Database is Connected");
  } else {
    console.log("Database is not Connected");
  }
});

module.exports = connection;
