const mysql = require("mysql");

// 创建数据库连接
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "test",
});

// 连接到数据库
connection.connect((err) => {
  if (err) throw err;
  console.log("数据库连接成功");
});

module.exports = connection;
