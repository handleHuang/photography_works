const connection = require("../db/index");
const mysql = require("mysql");

// 作品列表
exports.workList = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.per_page) || 5;
    const offset = (page - 1) * pageSize;
    const keyword = req.query.title || "";
    const state = req.query.state || ""; // 是否发布 1/2 1已发布、2未发布
    const top = parseInt(req.query.top) || 0; // 1收藏数最多的 //0最新作品
    const topic = req.query.topic; // 命题筛选

    let countQueryBase =
      "SELECT COUNT(*) AS total FROM works_list WHERE title LIKE ?";
    let queryBase = "SELECT * FROM works_list WHERE title LIKE ?";
    let countParams = [`%${keyword}%`];
    let queryParams = [`%${keyword}%`];

    if (topic) {
      countQueryBase += " AND topic = ?";
      queryBase += " AND topic = ?";
      countParams.push(topic);
      queryParams.push(topic);
    }

    if (state) {
      countQueryBase += " AND state = ?";
      queryBase += " AND state = ?";
      countParams.push(state);
      queryParams.push(state);
    }

    if (top === 1) {
      queryBase += " ORDER BY collect_number DESC"; // 根据collect_number字段降序排序
    } else {
      queryBase += " ORDER BY created_at DESC"; // 根据created_at字段降序排序
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
          if (element.cover !== "") {
            let chuli = JSON.parse(element.cover.replace(/'/g, '"'));
            element.cover = chuli.map(function (match) {
              return "http://127.0.0.1:12134/upload/" + match;
            });
          }
          if (element.beiyong1 !== "") {
            let chuli1 = JSON.parse(element.beiyong1.replace(/'/g, '"'));
            element.beiyong1 = chuli1.map(function (match) {
              return "http://127.0.0.1:12134/upload/" + match;
            });
          }
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

        // 执行查询works_list表的语句
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

            rows.forEach((element, index) => {
              if (element.cover !== "") {
                let chuli = JSON.parse(element.cover.replace(/'/g, '"'));
                element.cover = chuli.map(function (match) {
                  return "http://127.0.0.1:12134/upload/" + match;
                });
              }
              if (element.beiyong1 !== "") {
                let chuli1 = JSON.parse(element.beiyong1.replace(/'/g, '"'));
                element.beiyong1 = chuli1.map(function (match) {
                  return "http://127.0.0.1:12134/upload/" + match;
                });
              }
            });

            // 如果collect表中有对应数据，则将collect字段改为1
            if (collectRows.length > 0) {
              rows[0].collect = 1;
            } else {
              rows[0].collect = 0;
            }

            // 查询comment表的语句
            connection.query(
              "SELECT c1.*, c2.username, c2.cover FROM comment c1 LEFT JOIN user_list c2 ON c1.user_id = c2.id WHERE c1.blog_id = ?",
              [id],
              (error, commentRows) => {
                if (error) {
                  connection.release(); // 释放连接
                  res.status(500).json({ error: "查询失败" });
                  return;
                }

                const comments = [];
                const commentMap = {};

                // 构建评论的树形结构
                for (const comment of commentRows) {
                  comment.children = [];
                  commentMap[comment.id] = comment;

                  if (comment.parent_id === 0) {
                    // 如果父ID为0，表示是顶级评论
                    comments.push(comment);
                  } else {
                    // 如果存在父评论ID，则找到父评论
                    const parentComment = commentMap[comment.parent_id];
                    if (parentComment) {
                      // 如果父评论是顶级评论，直接将当前评论作为子评论
                      if (parentComment.parent_id === 0) {
                        parentComment.children.push(comment);
                      } else {
                        // 如果父评论不是顶级评论，则当前评论是回复给子评论的
                        // 需要找到顶级评论，并将当前评论加入到顶级评论的子评论列表中
                        const topLevelParentComment =
                          commentMap[parentComment.parent_id];
                        if (topLevelParentComment) {
                          topLevelParentComment.children.push(comment);
                        }
                      }
                    }
                  }

                  // 添加被回复人的username到评论对象中（仅在level为3时添加）
                  if (comment.level === 3) {
                    const repliedUser = commentMap[comment.parent_id]; // level为3时，被回复的是父评论
                    if (repliedUser) {
                      comment.replied_username = repliedUser.username;
                    }
                  }
                }

                if (connection._pool._closed) {
                  return; // 连接已经被释放，不执行后续代码
                }
                connection.release(); // 释放连接
                rows[0].comments = comments;
                res.json(rows[0]);
              }
            );
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

    // 数据删除成功后，查询并删除collect表中对应item_id的数据
    const collectDeleteQuery = "DELETE FROM collect WHERE item_id = ?";
    const collectDeleteParams = [id];

    connection.query(collectDeleteQuery, collectDeleteParams, (err, result) => {
      if (err) {
        console.log("[Collect Delete ERROR] - ", err.message);
        return res.status(500).send("Internal Server Error");
      }

      res.status(200).json({
        status: 200,
        message: "数据删除成功",
      });
    });
  });
};

// 新建作品
exports.addWork = (req, res) => {
  try {
    const {
      username,
      user_img,
      title,
      topic,
      cont,
      process,
      cover,
      beiyong1,
      beiyong2,
      collect,
      collect_number,
      state,
    } = req.body;

    // 插入数据
    const sql = `INSERT INTO works_list (user_name, user_img, title, topic, cont, process, cover, beiyong1, beiyong2, collect, collect_number, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      username,
      user_img,
      title,
      topic,
      cont,
      process,
      cover,
      beiyong1,
      beiyong2,
      collect,
      collect_number,
      state,
    ];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          status: 500,
          message: "服务器内部错误",
        });
      }

      // 插入成功
      return res.status(200).json({
        status: 200,
        message: "上传成功",
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

// 编辑
exports.edit = (req, res) => {
  try {
    const {
      id,
      username,
      user_img,
      title,
      topic,
      cont,
      process,
      cover,
      beiyong1,
      beiyong2,
      collect,
      collect_number,
      state,
    } = req.body;

    // 更新数据
    const sql = `UPDATE works_list SET user_name = ?, user_img = ?, title = ?, topic = ?, cont = ?, process = ?, cover = ?, beiyong1 = ?, beiyong2 = ?, collect = ?, collect_number = ?, state = ? WHERE id = ?`;
    const values = [
      username,
      user_img,
      title,
      topic,
      cont,
      process,
      cover,
      beiyong1,
      beiyong2,
      collect,
      collect_number,
      state,
      id,
    ];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          status: 500,
          message: "服务器内部错误",
        });
      }

      // 更新成功
      return res.status(200).json({
        status: 200,
        message: "修改成功",
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

// 推荐

exports.random = (req, res) => {
  // 在数据库中查询表works_list的所有数据
  connection.query("SELECT * FROM works_list", (err, works) => {
    if (err) {
      // 处理错误
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // 随机选择4条数据
    const randomWorks = getRandomElements(works, 4);

    // 将结果发送给客户端
    res.json(randomWorks);
  });
};

// 辅助函数，用于从数组中随机选择指定数量的元素
function getRandomElements(arr, count) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
