//引入
const express = require("express");
const multer = require("multer");

//创建服务器实例对象
const app = express();

//解决跨域
const cors = require("cors");
app.use(cors());
// 处理 POST 请求的中间件
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let objMulter = multer({ dest: "./public/upload" });
//实例化multer，传递的参数对象，dest表示上传文件的存储路径
app.use(objMulter.any()); //any表示任意类型的文件
// app.use(objMulter.image())//仅允许上传图片类型

app.use(express.static("./public")); //将静态资源托管，这样才能在浏览器上直接访问预览图片或则html页面

//此处我写了模块化，你们也可以不用模块化，直接在这里写get,post请求也可以
const uploadimg = require("./router/uploadimg");
app.use("/api", uploadimg);

//启动服务器
app.listen(12134, () => {
  console.log("http://127.0.0.1:12134");
});
