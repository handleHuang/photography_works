const connection = require("../db/index");
const mysql = require("mysql");
// 新建分类
exports.addLabel = (req, res) => {
  try {
    const { title, cont, cover, online } = req.body;

    // 准备插入数据的SQL查询语句
    const query = `INSERT INTO classify (title, cont, cover, online) VALUES (?, ?, ?, ?)`;

    // 执行SQL查询，插入数据
    connection.query(query, [title, cont, cover, online], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          status: 500,
          message: "服务器内部错误",
        });
      }

      // 数据插入成功
      return res.status(200).json({
        status: 200,
        message: "数据插入成功",
        data: results,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "服务器内部错误",
    });
  }
};

// 分类列表
exports.labelList = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.per_page) || 5;
    const offset = (page - 1) * pageSize;
    const keyword = req.query.keyword || "";
    const online = req.query.online || ""; // 新增的online筛选条件

    let countQueryBase =
      "SELECT COUNT(*) AS total FROM classify WHERE title LIKE ?";
    let queryBase = "SELECT * FROM classify WHERE title LIKE ?";
    let countParams = [`%${keyword}%`];
    let queryParams = [`%${keyword}%`];

    if (online) {
      countQueryBase += " AND online = ?";
      queryBase += " AND online = ?";
      countParams.push(online);
      queryParams.push(online);
    }

    const countQuery = countQueryBase;
    const query = queryBase + " LIMIT ?, ?";
    countParams.push(offset, pageSize);
    queryParams.push(offset, pageSize);

    connection.query(countQuery, countParams, function (countErr, countResult) {
      if (countErr) {
        console.log("[Count ERROR] - ", countErr.message);
        return res.status(500).send("Internal Server Error");
      }

      const totalCount = countResult[0].total;

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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "服务器内部错误",
    });
  }
};

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "test",
  connectionLimit: 10,
});
// 分类详情
exports.labelDetails = (req, res) => {
  const id = req.query.id;

  // 从连接池中获取一个连接
  pool.getConnection((error, connection) => {
    if (error) {
      res.status(500).json({ error: "获取数据库连接失败" });
      return;
    }

    // 执行查询语句
    connection.query(
      "SELECT * FROM classify WHERE id = ?",
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
};

// 修改上下架
exports.labelOline = (req, res) => {
  const { id, online } = req.body;
  console.log(id, online);

  // 数据有效性验证
  if (!id || !online) {
    return res.status(400).json({
      status: 400,
      message: "缺少必要参数",
    });
  }

  const updateSQL = "UPDATE classify SET online = ? WHERE id = ?";
  const updateParams = [online, id];

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
};

// 修改分类信息
exports.labelAnemd = (req, res) => {
  const { id, online, title, cont, cover } = req.body;

  const updateQuery =
    "UPDATE classify SET online = ?, title = ?, cont = ?, cover = ? WHERE id = ?";
  const updateParams = [online, title, cont, cover, id];

  connection.query(updateQuery, updateParams, (err, result) => {
    if (err) {
      console.log("[Update ERROR] - ", err.message);
      return res.status(500).send("Internal Server Error");
    }

    res.status(200).json({
      status: 200,
      message: "数据更新成功",
    });
  });
};

exports.labelDel = (req, res) => {
  const id = req.query.id;
  console.log(id);

  const deleteQuery = "DELETE FROM classify WHERE id = ?";
  const deleteParams = [id];

  connection.query(deleteQuery, deleteParams, (err, result) => {
    if (err) {
      console.log("[Delete ERROR] - ", err.message);
      return res.status(500).send("Internal Server Error");
    }

    res.status(200).json({
      status: 200,
      message: "数据删除成功",
    });
  });
};

exports.classifyData = (req, res) => {
  const query =
    "SELECT topic, COUNT(*) AS count FROM works_list GROUP BY topic";

  connection.query(query, (error, results) => {
    if (error) throw error;

    // 生成列表
    const list = results.map((result) => `${result.topic}: ${result.count}`);
    const fieldNames = list.map((item) => item.split(":")[0]);

    res.status(200).json({
      status: 200,
      data: {
        list: list,
        fieldNames: fieldNames,
      },
    });
  });
};

exports.classifyDatayuan = (req, res) => {
  const sqlQuery = `
  SELECT 
  SUM(CASE WHEN online = 1 THEN 1 ELSE 0 END) AS count_1,
  SUM(CASE WHEN online = 2 THEN 1 ELSE 0 END) AS count_2
  FROM 
  classify;
  `;
  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("查询出错：", error);
      res.status(500).json({ error: "查询出错" });
    } else {
      const count1 = results[0].count_1;
      const count2 = results[0].count_2;
      res.json({ online: count1, notlive: count2 });
    }
  });
};