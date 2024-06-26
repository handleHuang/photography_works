// 创建服务器
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const handle = require("../router_handler/uploadimg");
const classify = require("../views/classify");
const work = require("../views/worklist");
const collect = require("../views/collect");
const user = require("../views/user");
const comment = require("../views/comment");
const competition = require("../views/competition");
const jwt = require("jsonwebtoken");
const verifyToken = require("../fun/verify_token");

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
router.post("/upUserImg", handle.upUserImg);
router.post("/signature", handle.signature);
// router.post("/upimage", handle.upimage);
//分类接口
router.post("/addLabel", verifyToken, classify.addLabel);
router.get("/labelList", classify.labelList);
router.get("/labelDetails", verifyToken, classify.labelDetails);
router.get("/classifyData", verifyToken, classify.classifyData);
router.get("/classifyDatayuan", verifyToken, classify.classifyDatayuan);
router.get("/workOlineState", verifyToken, work.workOlineState);
router.post("/labelOline", verifyToken, classify.labelOline);
router.post("/labelAnemd", verifyToken, classify.labelAnemd);
router.delete("/labelDel", verifyToken, classify.labelDel);
//赛事接口
router.post("/addCompetition", verifyToken, competition.addLabel);
router.get("/competitionList", competition.labelList);
router.get("/competitionDetails", verifyToken, competition.labelDetails);
router.post("/competitionOline", verifyToken, competition.labelOline);
router.post("/competitionAnemd", verifyToken, competition.labelAnemd);
router.delete("/competitionDel", verifyToken, competition.labelDel);
router.delete("/competitionRowDel", verifyToken, competition.labelRowDel);
//赛事子表
router.post("/compList", verifyToken, competition.compList);

//作品管理
router.get("/workList", work.workList);
router.get("/workDetails", verifyToken, work.workDetails);
router.post("/workOline", verifyToken, work.workOline);
router.post("/addWork", work.addWork);
router.delete("/workDel", verifyToken, work.workDel);
router.post("/edit", verifyToken, work.edit);
// 收藏
router.post("/collect", verifyToken, collect.collect);
router.get("/rankList", verifyToken, collect.collectList);
// 用户作品列表
router.get("/userWorkList", verifyToken, user.userList);
router.get("/userlinkList", verifyToken, user.userlinkList);
// 首页推荐作品
router.get("/randomWorks", work.random);
// 作品评论
router.post("/addComment", verifyToken, comment.addComment);

// 获取数据列表
router.get("/userList", verifyToken, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;
  const offset = (page - 1) * pageSize;
  const keyword = req.query.keyword || "";
  const identity = req.query.identity || ""; // 新增的字段名为 identity

  const countQuery =
    "SELECT COUNT(*) AS total FROM user_list WHERE username LIKE ? AND identity LIKE ?"; // 在查询语句中添加 identity 的筛选条件
  const countParams = [`%${keyword}%`, `%${identity}%`]; // 将筛选条件添加到参数中
  connection.query(countQuery, countParams, function (countErr, countResult) {
    if (countErr) {
      console.log("[Count ERROR] - ", countErr.message);
      return res.status(500).send("Internal Server Error");
    }

    const totalCount = countResult[0].total;

    const query =
      "SELECT * FROM user_list WHERE username LIKE ? AND identity LIKE ? LIMIT ?, ?"; // 在查询语句中添加 identity 的筛选条件
    const queryParams = [`%${keyword}%`, `%${identity}%`, offset, pageSize]; // 将筛选条件添加到参数中
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
    const { username, password, newEmail, identity, cover, like_number } =
      req.body; // 获取前端传递的数据

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
        "INSERT INTO `user_list` (`username`, `password`, `email`, `identity`, `cover`, `like_number`) VALUES (?,?,?,?,?,?);";
      const insertValues = [
        username,
        password,
        newEmail,
        identity,
        cover,
        like_number,
      ];

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
          user.domian = "http://127.0.0.1:12134/upload/";

          // 生成token
          const token = jwt.sign({ username: user.username }, "hon71234", {
            expiresIn: "2h",
          });

          // 返回响应给前端，包括注册信息和token
          res.status(200).json({
            status: 200,
            message: "注册成功",
            user,
            token,
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
    "SELECT id, username, password, identity, cover FROM user_list WHERE username=? AND password=?";
  const selectParams = [username, password];

  connection.query(selectSQL, selectParams, (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      const identity = result[0].identity;
      if (identity === 0 || identity === 1) {
        const token = jwt.sign({ username: result[0].username }, "hon71234", {
          expiresIn: "2h",
        });
        console.log(result[0]);
        res.status(200).send({
          status: 200,
          message: "登录成功",
          data: {
            id: result[0].id,
            username: result[0].username,
            domian: "http://127.0.0.1:12134/upload/",
            identity: identity,
            token: token,
            cover: result[0].cover,
          },
        });
      } else {
        res.status(403).send({
          status: 403,
          message: "登录失败，用户身份不符合要求",
        });
      }
    } else {
      res.status(403).send({
        status: 405,
        message: "登录失败，用户名或密码错误",
      });
    }
  });
});

// 删除
router.delete("/delUser", verifyToken, (req, res) => {
  const userId = req.query.id;
  const identity = req.query.identity;

  if (identity === "0") {
    const deleteQuery = "DELETE FROM user_list WHERE id = ?";
    const deleteParams = [userId];

    connection.query(deleteQuery, deleteParams, function (err, result) {
      if (err) {
        console.log("[Delete ERROR] - ", err.message);
        return res.status(500).send("Internal Server Error");
      }

      res.status(200).send({
        status: 200,
        message: "数据删除成功",
      });
    });
  } else {
    res.status(403).send({
      status: 403,
      message: "只有超级管理员才能删用户",
    });
  }
});

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "test",
  connectionLimit: 10,
});
// 用户详情
router.get("/detailsUser", verifyToken, (req, res) => {
  const id = req.query.id;

  // 从连接池中获取一个连接
  pool.getConnection((error, connection) => {
    if (error) {
      res.status(500).json({ error: "获取数据库连接失败" });
      return;
    }

    // 执行查询语句
    connection.query(
      "SELECT * FROM user_list WHERE id = ?",
      [id],
      (error, rows) => {
        connection.release(); // 释放连接
        if (error) {
          res.status(500).json({ error: "查询失败" });
          return;
        }

        if (rows.length === 0) {
          res.status(404).json({ error: "未找到对应的信息" });
          return;
        }

        res.json(rows[0]);
      }
    );
  });
});

// 修改
router.post("/anemdUser", verifyToken, (req, res) => {
  const { id, username, password, email, identity, cover } = req.body;

  // 数据有效性验证
  if (!id || !username || !password || !email) {
    return res.status(400).json({
      status: 400,
      message: "缺少必要参数",
    });
  }

  const updateSQL =
    "UPDATE user_list SET username = ?, password = ?, email = ?, identity = ?, cover = ? WHERE id = ?";
  const updateParams = [username, password, email, identity, cover, id];

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
