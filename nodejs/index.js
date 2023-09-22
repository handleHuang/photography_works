const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const uploadRouter = require("./upload");

const app = express();
// 处理 POST 请求的中间件
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(fileUpload());
app.use("/api", uploadRouter); // 假设你的接口路径为/api/upload

app.listen(3000, () => {
  console.log("api服务: http://192.168.0.67:3000");
});
