const connection = require("../db/index");
// 收藏
exports.collect = (req, res) => {
  try {
    const { user_id, item_id } = req.body;

    // 准备查询数据是否存在的SQL语句
    const selectQuery = `SELECT * FROM collect WHERE user_id = ? AND item_id = ?`;

    // 执行查询操作
    connection.query(selectQuery, [user_id, item_id], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          status: 500,
          message: "服务器内部错误",
        });
      }

      // 如果存在相同记录，则执行删除操作
      if (results.length > 0) {
        const deleteQuery = `DELETE FROM collect WHERE user_id = ? AND item_id = ?`;

        // 执行删除操作
        connection.query(deleteQuery, [user_id, item_id], (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).json({
              status: 500,
              message: "服务器内部错误",
            });
          }

          // 更新works_list表
          const updateDeleteQuery = `UPDATE works_list SET collect_number = collect_number - 1 WHERE id = ?`;

          // 执行更新操作
          connection.query(updateDeleteQuery, [item_id], (error, results) => {
            if (error) {
              console.error(error);
              return res.status(500).json({
                status: 500,
                message: "服务器内部错误",
              });
            }

            // 数据删除成功
            return res.status(200).json({
              status: 200,
              message: "作品收藏已取消",
              data: results,
            });
          });
        });
      } else {
        // 如果不存在相同记录，则执行插入操作
        const insertQuery = `INSERT INTO collect (user_id, item_id) VALUES (?, ?)`;

        // 执行插入操作
        connection.query(insertQuery, [user_id, item_id], (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).json({
              status: 500,
              message: "服务器内部错误",
            });
          }

          // 更新works_list表
          const updateInsertQuery = `UPDATE works_list SET collect_number = collect_number + 1 WHERE id = ?`;

          // 执行更新操作
          connection.query(updateInsertQuery, [item_id], (error, results) => {
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
              message: "作品收藏成功",
              data: results,
            });
          });
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "服务器内部错误",
    });
  }
};
