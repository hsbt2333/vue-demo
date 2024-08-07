const { defineConfig } = require('@vue/cli-service')

const path = require('path')
const config = defineConfig({
  devServer: {
    port: '8080',
  },
  configureWebpack: {
    name: '',
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    }
  },
  transpileDependencies: true,
  runtimeCompiler: true,
})
module.exports = config
