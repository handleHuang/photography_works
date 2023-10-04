const connection = require("../db/index");
const mysql = require("mysql");

// 作品列表
		
exports.workList = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.per_page) || 5;
    const offset = (page - 1) * pageSize;
    const keyword = req.query.title || "";
    const state = req.query.state || "";
    const isTop = req.query.top === "1"; // 判断是否传递了top参数并且值为1

    let countQueryBase =
      "SELECT COUNT(*) AS total FROM works_list WHERE title LIKE ?";
    let queryBase = "SELECT * FROM works_list WHERE title LIKE ?";
    let countParams = [`%${keyword}%`];
    let queryParams = [`%${keyword}%`];

    if (state) {
      countQueryBase += " AND state = ?";
      queryBase += " AND state = ?";
      countParams.push(state);
      queryParams.push(state);
    }

    if (isTop) {
      queryBase += " ORDER BY collect_number DESC"; // 根据collect_number字段降序排序
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

        result.forEach((element, index) => {
          element.cover = element.cover
            .match(/'([^']+)'/g)
            .map(function (match) {
              return "http://127.0.0.1:12134/upload/" + match.slice(1, -1);
            });
        });

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
// 作品详情
exports.workDetails = (req, res) => {
  const id = req.query.id;
  const user_id = req.query.user_id;

  // 从连接池中获取一个连接
  pool.getConnection((error, connection) => {
    if (error) {
      res.status(500).json({ error: "获取数据库连接失败" });
      return;
    }

    // 先查询collect表是否存在对应数据
    connection.query(
      "SELECT * FROM collect WHERE item_id = ? AND user_id = ?",
      [id, user_id],
      (error, collectRows) => {
        if (error) {
          connection.release(); // 释放连接
          res.status(500).json({ error: "查询失败" });
          return;
        }

        // 执行查询语句
        connection.query(
          "SELECT * FROM works_list WHERE id = ?",
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

            rows[0].cover = rows[0].cover
              .match(/'([^']+)'/g)
              .map(function (match) {
                return "http://127.0.0.1:12134/upload/" + match.slice(1, -1);
              });

            // 如果collect表中有对应数据，则将collect字段改为1
            if (collectRows.length > 0) {
              rows[0].collect = 1;
            }else {
              rows[0].collect = 0;
            }

            connection.release(); // 释放连接
            res.json(rows[0]);
          }
        );
      }
    );
  });
};

// 修改上下架
exports.workOline = (req, res) => {
  const { id, state } = req.body;
  console.log(id, state);

  // 数据有效性验证
  if (!id || !state) {
    return res.status(400).json({
      status: 400,
      message: "缺少必要参数",
    });
  }

  const updateSQL = "UPDATE works_list SET state = ? WHERE id = ?";
  const updateParams = [state, id];

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

// 删除
exports.workDel = (req, res) => {
  const id = req.query.id;
  console.log(id);

  const deleteQuery = "DELETE FROM works_list WHERE id = ?";
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
