const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './', //解决dist打包之后本地打开页面空白
  transpileDependencies: true
})
