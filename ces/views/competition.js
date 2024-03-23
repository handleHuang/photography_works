const connection = require("../db/index");
const mysql = require("mysql");
// 新建赛事
exports.addLabel = (req, res) => {
  try {
    const { title, cont, cont2, cover, online } = req.body;

    // 准备插入数据的SQL查询语句
    const query = `INSERT INTO competition (title, cont, cont2, cover, online) VALUES (?, ?, ?, ?, ?)`;

    // 执行SQL查询，插入数据
    connection.query(query, [title, cont, cont2, cover, online], (error, results) => {
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

// 赛事列表
exports.labelList = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.per_page) || 5;
    const offset = (page - 1) * pageSize;
    const keyword = req.query.keyword || "";
    const online = req.query.online || ""; // 新增的online筛选条件

    let countQueryBase =
      "SELECT COUNT(*) AS total FROM competition WHERE title LIKE ?";
    let queryBase = "SELECT * FROM competition WHERE title LIKE ?";
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
// 赛事详情
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
      "SELECT * FROM competition WHERE id = ?",
      [id],
      (error, rows) => {
        if (error) {
          connection.release(); // 释放连接
          res.status(500).json({ error: "查询失败" });
          return;
        }

        if (rows.length === 0) {
          connection.release(); // 释放连接
          res.status(404).json({ error: "未找到对应的信息" });
          return;
        }

        const competition = rows[0];

        // 查询competition_list表中对应item_list的数据
        connection.query(
          "SELECT * FROM competition_list WHERE item_id = ?",
          [id],
          (error, rows) => {
            connection.release(); // 释放连接
            if (error) {
              res.status(500).json({ error: "查询失败" });
              return;
            }

            competition.item_list = rows;
            res.json(competition);
          }
        );
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

  const updateSQL = "UPDATE competition SET online = ? WHERE id = ?";
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

// 修改赛事信息
exports.labelAnemd = (req, res) => {
  const { id, online, title, cont, cont2, cover } = req.body;

  const updateQuery =
    "UPDATE competition SET online = ?, title = ?, cont = ?,cont2 = ?, cover = ? WHERE id = ?";
  const updateParams = [online, title, cont, cont2, cover, id];

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

  const deleteQuery = "DELETE FROM competition WHERE id = ?";
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

exports.compList = (req, res) => {
    try {
      const { item_id, title, name, cover, cont, iphone } = req.body;
  
      // 准备插入数据的SQL查询语句
      const query = `INSERT INTO competition_list (item_id, title, name, cover, cont, iphone) VALUES (?, ?, ?, ?, ?, ?)`;
  
      // 执行SQL查询，插入数据
      connection.query(query, [item_id, title, name, cover, cont, iphone], (error, results) => {
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

  exports.labelRowDel = (req, res) => {
    const id = req.query.id;
    console.log(id);
  
    const deleteQuery = "DELETE FROM competition_list WHERE id = ?";
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