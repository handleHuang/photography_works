fs = require("fs");

exports.uploadimg = (req, res) => {
  let oldName = req.files[0].filename; //获取名字
  console.log(oldName);
  let originalname = req.files[0].originalname; //originnalname其实就是你上传时候文件起的名字
  //给新名字加上原来的后缀
  let newName = req.files[0].originalname;
  fs.renameSync("./public/upload/" + oldName, "./public/upload/" + newName); //改图片的名字注意此处一定是一个路径，而不是只有文件名
  const filePath = "http://127.0.0.1:12134/upload/" + newName;

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(err)
      // console.error(`文件不存在: ${filePath}`);
    } else {
      // console.log(`文件存在: ${filePath}`);
    }
  });
  res.send({
    err: 0,
    url: "http://127.0.0.1:12134/upload/" + newName,
  });
};

// 上传头像
exports.upUserImg = (req, res) => {
  let oldName = req.files[0].filename; //获取名字
  console.log(oldName);
  let originalname = req.files[0].originalname; //originnalname其实就是你上传时候文件起的名字
  //给新名字加上原来的后缀
  let newName = req.files[0].originalname;
  fs.renameSync("./public/upload/" + oldName, "./public/user/" + newName); //改图片的名字注意此处一定是一个路径，而不是只有文件名
  const filePath = "http://127.0.0.1:12134/user/" + newName;
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(err)
      // console.error(`文件不存在: ${filePath}`);
    } else {
      // console.log(`文件存在: ${filePath}`);
    }
  });
  res.send({
    err: 0,
    url: "http://127.0.0.1:12134/user/" + newName,
  });
};
