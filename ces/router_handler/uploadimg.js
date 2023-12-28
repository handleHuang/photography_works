fs = require("fs");

exports.uploadimg = (req, res) => {
  let oldName = req.files[0].filename; //获取名字
  console.log(oldName);
  let originalname = req.files[0].originalname; //originnalname其实就是你上传时候文件起的名字
  //给新名字加上原来的后缀
  let newName = req.files[0].originalname;
  fs.renameSync("./public/upload/" + oldName, "./public/upload/" + newName); //改图片的名字注意此处一定是一个路径，而不是只有文件名
  const filePath = "http://127.0.0.1:12134/upload/" + newName;

  fs.access(filePath, fs.constants.F_OK, (err) => {});
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
      console.log(err);
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

const qiniu = require("qiniu");

// 配置七牛云的Access Key和Secret Key
const accessKey = "7q1krmx6lDlJjoCNd66NfOuu89GIwC4AyH00rrJ4";
const secretKey = "AhlE3qfdOynWIqcUT8bUQfcwexS5cxZeeTJReNS8";
const bucket = "product712";

// 创建七牛云的配置对象
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2; // 选择华南地区作为存储区域

// 创建七牛云的上传凭证
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
  scope: bucket,
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

// 封装上传头像的函数
exports.upimage = (req, res) => {
  const oldName = req.files[0].filename;
  const originalname = req.files[0].originalname;
  const newName = req.files[0].originalname;

  fs.renameSync("./public/upload/" + oldName, "./public/user/" + newName);

  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  const key = Date.now() + "_" + newName;

  formUploader.putFile(
    uploadToken,
    key,
    "./public/user/" + newName,
    putExtra,
    (respErr, respBody, respInfo) => {
      if (respErr) {
        res.status(500).json({ error: respErr });
      } else {
        const filePath = "http://s2tdzhlxg.hn-bkt.clouddn.com/" + respBody.key;
        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (err) {
            console.log(err);
          }
        });
        res.send({
          err: 0,
          url: filePath,
        });
      }
    }
  );
};
