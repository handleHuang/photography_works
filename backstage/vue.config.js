const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  lintOnSave: false,
  publicPath: './',
  outputDir: 'dist',
  configureWebpack: {
    // ...
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  devServer: {
    port: '8080',
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  }
}
