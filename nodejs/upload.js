const express = require("express");
const mysql = require("mysql");
const router = express.Router();

// 创建MySQL数据库连接
const connection = mysql.createConnection({
  host: "192.168.0.67",
  user: "root",
  password: "123456",
  database: "test",
});

connection.connect((err) => {
  if (err) throw err;
});

router.get("/server", (req, res) => {
  selectSQL = "select * from users";
  connection.query(selectSQL, function (err, result) {
    if (err) {
      console.log("[login ERROR] - ", err.message);
      return;
    }
    res.send(result);
  });
});

// 注册
router.post("/pushdata", function (req, res) {
  const data = req.body; // 获取前端传递的数据
  console.log(data); // 打印数据
  const sql =
    "INSERT INTO `user_list` (`username`, `password`, `email`) VALUES (?,?,?);";
  const values = [data.username, data.password, data.newEmail];
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
  // 返回响应给前端
  res.status(200).send("Data received and printed");
});

// 登录
router.post("/login", (req, res) => {
  const data = req.body; // 获取前端传递的数据
  console.log(data); // 打印数据
  selectSQL = "SELECT username,password FROM user_list;";
  connection.query(selectSQL, (err, result) => {
    if (err) throw err;
    for (let i = 0; i < result.length; i++) {
      console.log(result[i]);
      if (
        result[i].username === data.username &&
        result[i].password === data.password
      ) {
        res.status(200).send({
          status: 200,
          message: "登录成功",
        });
      } else {
        res.status(200).send({
          status: 204,
          message: "登录失败，账号或密码不正确",
        });
      }
    }
  });
});

// 搜索
router.post("/search", (req, res) => {
  const data = req.body;
  searchKeyword(data.test, res);
});
function searchKeyword(keyword, res) {
  const query = `SELECT * FROM user_list WHERE username LIKE ?`;
  connection.query(query, [`%${keyword}%`], (error, results) => {
    if (error) throw error;
    console.log(results);
    res.status(200).send({
      status: 200,
      data: results,
    });
  });
}

// 删除
router.delete("/delUser", (req, res) => {
  const data = req.body; // 获取前端传递的数据
  console.log(data); // 打印数据
  selectSQL = `DELETE FROM user_list WHERE id=${data.id}`;
  connection.query(selectSQL, (err, result) => {
    if (err) throw err;
    res.status(200).send({
      status: 200,
      message: "删除成功",
    });
  });
});

// 修改
router.post("/anemdUser", (req, res) => {
  const data = req.body; // 获取前端传递的数据
  console.log(data); // 打印数据
  selectSQL = `UPDATE user_list SET password='${data.password}', email='${data.email}' WHERE id=${data.id};`;
  connection.query(selectSQL, (err, result) => {
    if (err) throw err;
    res.status(200).send({
      status: 200,
      message: "修改成功",
    });
  });
});

// 上传图片
router.post("/upload", (req, res) => {
  const file = req.files.file; // 假设前端使用FormData上传，图片字段名为image
  console.log(req.files)
  const filename = file.name;
  const filePath = `./uploads/${filename}`; // 将图片保存在uploads文件夹下

  file.mv(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("图片上传失败");
    }
    res.send({
      // 给前端返回的数据
      body: req.body,
      file: file,
      cover: "http://172.0.0.1:3000" + "/uploads/" + filename,
    });
  });
});

module.exports = router;
