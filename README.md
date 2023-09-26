# photography_works
摄影作品展示平台的设计与实现  
技术vue3 + ts + vite + mysql(数据库) + nodejs(后端)  

# 运行项目步骤
拉取代码，前提是要有github账号  
git clone https://github.com/handleHuang/photography_works.git  

给文件安装依赖前需要检查node版本、尽量本来靠近16.18.0(免得不兼容)，或者看文档安装  
https://juejin.cn/post/7094576504243224612  
安装nodejs  
nvm install 16.18.0  

拉去代码后进入到写ces的文件里安装依赖  
git install  

运行nodejs文件(要先运行接口文件后才能跑vue的项目，要不然项目会报错)  
nodemon app.js  (如果运行nodejs文件失败有可能是链接数据库的本地地址有误，可以打开设置看可能ip是多少然后到db文件进行修改host字段的ip)   

进入到AIGC_admin(管理后台)安装依赖  
git install  

安装完依赖后再运行项目  
npm run dev  