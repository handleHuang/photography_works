const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  jwt.verify(token, "hon71234", (err, decoded) => {
    if (err) {
      // token验证失败
      return res.status(401).json({
        status: 401,
        message: "无效的token",
      });
    }

    // 验证通过，将解码后的token数据存储在req对象中的decoded属性中
    req.decoded = decoded;
    next();
  });
}

module.exports = verifyToken;
