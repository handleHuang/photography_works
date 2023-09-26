// 创建服务器
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const handle = require("../router_handler/uploadimg");
const view = require("../views/classify")

// 创建MySQL数据库连接
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "test",
});

// 连接数据库
connection.connect((err) => {
  if (err) throw err;
});

// 上传图片
router.post("/uploadimg", handle.uploadimg);
//命题接口
router.post("/addLabel", view.addLabel);
router.get("/labelList", view.labelList);
router.get("/labelDetails", view.labelDetails);
router.post("/labelOline", view.labelOline);
router.post("/labelAnemd", view.labelAnemd);
router.delete("/labelDel", view.labelDel);

// 获取数据列表
router.get("/server", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;
  const offset = (page - 1) * pageSize;
  const keyword = req.query.keyword || "";

  const countQuery =
    "SELECT COUNT(*) AS total FROM user_list WHERE username LIKE ?";
  const countParams = [`%${keyword}%`];
  connection.query(countQuery, countParams, function (countErr, countResult) {
    if (countErr) {
      console.log("[Count ERROR] - ", countErr.message);
      return res.status(500).send("Internal Server Error");
    }

    const totalCount = countResult[0].total;

    const query = "SELECT * FROM user_list WHERE username LIKE ? LIMIT ?, ?";
    const queryParams = [`%${keyword}%`, offset, pageSize];
    connection.query(query, queryParams, function (err, result) {
      if (err) {
        console.log("[Query ERROR] - ", err.message);
        return res.status(500).send("Internal Server Error");
      }

      res.status(200).send({
        status: 200,
        data: result,
        totalCount: totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
        currentPage: page,
      });
    });
  });
});

// 注册
router.post("/register", function (req, res) {
  try {
    const { username, password, newEmail } = req.body; // 获取前端传递的数据

    // 数据有效性验证
    if (!username || !password || !newEmail) {
      return res.status(400).json({
        status: 400,
        message: "缺少必要参数",
      });
    }

    // 查询用户名是否已存在
    const checkSql = "SELECT * FROM `user_list` WHERE `username` = ?";
    const checkValues = [username];

    connection.query(checkSql, checkValues, function (err, results) {
      if (err) {
        console.error(err);
        return res.status(500).json({
          status: 500,
          message: "服务器内部错误",
        });
      }

      if (results.length > 0) {
        return res.status(400).json({
          status: 400,
          message: "用户名已存在",
        });
      }

      // 可以插入新用户
      const insertSql =
        "INSERT INTO `user_list` (`username`, `password`, `email`) VALUES (?,?,?);";
      const insertValues = [username, password, newEmail];

      connection.query(insertSql, insertValues, function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({
            status: 500,
            message: "服务器内部错误",
          });
        }

        // 查询刚注册的用户信息
        const selectSql = "SELECT * FROM `user_list` WHERE `username` = ?";
        const selectValues = [username];

        connection.query(selectSql, selectValues, function (err, results) {
          if (err) {
            console.error(err);
            return res.status(500).json({
              status: 500,
              message: "服务器内部错误",
            });
          }

          const user = results[0];

          // 返回响应给前端，包括注册信息
          res.status(200).json({
            status: 200,
            message: "注册成功",
            user,
          });
        });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: "服务器内部错误",
    });
  }
});

// 登录
router.post("/login", (req, res) => {
  const { username, password } = req.body; // 获取前端传递的数据

  // 数据有效性验证
  if (!username || !password) {
    return res.status(400).json({
      status: 400,
      message: "缺少必要参数",
    });
  }

  const selectSQL =
    "SELECT id, username, password FROM user_list WHERE username=? AND password=?";
  const selectParams = [username, password];

  connection.query(selectSQL, selectParams, (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.status(200).send({
        status: 200,
        message: "登录成功",
        data: {
          id: result[0].id,
          username: result[0].username,
          password: result[0].password,
        },
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "登录失败，用户名或密码错误",
      });
    }
  });
});

// 搜索
router.post("/search", (req, res) => {
  const { keyword } = req.body;

  // 数据有效性验证
  if (!keyword) {
    return res.status(400).json({
      status: 400,
      message: "缺少必要参数",
    });
  }

  const query = "SELECT * FROM user_list WHERE username LIKE ?";
  const queryParams = [`%${keyword}%`];

  connection.query(query, queryParams, (error, results) => {
    if (error) throw error;

    res.status(200).send({
      status: 200,
      data: results,
    });
  });
});

// 修改
router.post("/anemdUser", (req, res) => {
  const { id, newUsername, newPassword, newEmail } = req.body;

  // 数据有效性验证
  if (!id || !newUsername || !newPassword || !newEmail) {
    return res.status(400).json({
      status: 400,
      message: "缺少必要参数",
    });
  }

  const updateSQL =
    "UPDATE user_list SET username = ?, password = ?, email = ? WHERE id = ?";
  const updateParams = [newUsername, newPassword, newEmail, id];

  connection.query(updateSQL, updateParams, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        status: 500,
        message: "修改失败",
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: "修改成功",
    });
  });
});

// 导出路由
module.exports = router;