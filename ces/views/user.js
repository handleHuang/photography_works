const connection = require("../db/index");

// 用户作品列表
exports.userList = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.per_page) || 5;
    const offset = (page - 1) * pageSize;
    const beiyong2 = req.query.beiyong2; // 获取前端传递的user_id
    const topic = req.query.topic; // 命题筛选
    const top = req.query.top; // 1收藏数最多的 //0最新作品
    const keyword = req.query.keyword; // 关键词搜索

    let countQuery =
      "SELECT COUNT(*) AS total FROM works_list WHERE beiyong2 = ?";
    let query = "SELECT * FROM works_list WHERE beiyong2 = ?";

    const countParams = [beiyong2];
    const queryParams = [beiyong2];

    if (keyword) {
      countQuery += " AND title LIKE ?";
      query += " AND title LIKE ?";
      countParams.push(`%${keyword}%`);
      queryParams.push(`%${keyword}%`);
    }

    if (top === "1") {
      query += " ORDER BY created_at DESC";
    } else {
      query += " ORDER BY collect_number DESC";
    }

    query += " LIMIT ?, ?";
    queryParams.push(offset, pageSize);

    if (topic) {
      countQuery += " AND topic = ?";
      query += " AND topic = ?";
      countParams.push(topic);
      queryParams.push(topic);
    }

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

        // 获取用户信息
        const userQuery = "SELECT * FROM user_list WHERE id = ?";
        const userParams = [beiyong2];

        connection.query(userQuery, userParams, function (userErr, userResult) {
          if (userErr) {
            console.log("[User Query ERROR] - ", userErr.message);
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
            user: userResult[0], // 返回用户信息
            totalCount: totalCount,
            totalPages: Math.ceil(totalCount / pageSize),
            currentPage: page,
            keywordTotalCount: result.length, // 添加关键词搜索的总数
          });
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

// 收藏列表
exports.userlinkList = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.per_page) || 5;
    const offset = (page - 1) * pageSize;
    const beiyong2 = req.query.beiyong2; // 获取前端传递的user_id
    const topic = req.query.topic; // 命题筛选
    const top = req.query.top; // 1收藏数最多的 //0最新作品
    const keyword = req.query.keyword; // 获取前端传递的关键词

    // 构建查询collect表的语句
    let query = "SELECT * FROM collect";
    let params = [];

    if (beiyong2) {
      query += " WHERE user_id = ?";
      params.push(beiyong2);
    }

    // 添加topic筛选条件
    if (topic) {
      query += " AND topic = ?";
      params.push(topic);
    }

    // 执行查询collect表
    connection.query(query, params, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          status: 500,
          message: "服务器内部错误",
        });
      }

      // 处理查询结果
      const filteredResults = results.slice(offset, offset + pageSize);

      // 获取筛选出来的item_id数组
      const itemIds = filteredResults.map((result) => result.item_id);

      // 构建查询works_list表的语句id
      let worksQuery = "SELECT * FROM works_list WHERE id IN (?)";
      let worksParams = [itemIds];

      // 添加关键词搜索条件
      if (keyword) {
        worksQuery += " AND title LIKE ?";
        worksParams.push(`%${keyword}%`);
      }

      // 添加top排序条件
      if (top === "1") {
        worksQuery += " ORDER BY collect_number DESC";
      } else {
        worksQuery += " ORDER BY created_at DESC";
      }

      // 执行查询works_list表
      connection.query(worksQuery, worksParams, (worksError, worksResults) => {
        if (worksError) {
          console.error(worksError);
          return res.status(500).json({
            status: 500,
            message: "服务器内部错误",
          });
        }

        // 获取用户信息
        const userQuery = "SELECT * FROM user_list WHERE id = ?";
        const userParams = [beiyong2];

        // 执行查询user_list表
        connection.query(userQuery, userParams, (userError, userResults) => {
          if (userError) {
            console.error(userError);
            return res.status(500).json({
              status: 500,
              message: "服务器内部错误",
            });
          }

          // 处理查询结果
          const userData = userResults[0];
          worksResults.forEach((element, index) => {
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

          // 查询总数
          const totalCount = results.length;

          return res.status(200).send({
            status: 200,
            data: worksResults,
            user: userData,
            totalCount: totalCount,
            totalPages: Math.ceil(totalCount / pageSize),
            currentPage: page,
          });
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
