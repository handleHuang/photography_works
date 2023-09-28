# Vue 3 + TypeScript + Vite

拉取项目后运行 npm install 装依赖

运行项目 npm run dev

正式环境中需要在utils/http.ts文件把config.headers.staffname = 'test'注释，config.headers.staffname = 'test'是测试数据

打包：找到.env文件修改api为正式环境后 使用npm run build
