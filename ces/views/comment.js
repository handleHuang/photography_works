const connection = require("../db/index");

// 发布评论
exports.addComment = (req, res) => {
  try {
    const { content, level, parent_id, blog_id, user_id } = req.body;

    // 插入数据
    const sql = `INSERT INTO comment (content, level, parent_id, blog_id, user_id) VALUES (?,?,?,?,?)`;
    const values = [ content, level, parent_id, blog_id, user_id ];

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
        message: "评论成功",
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
