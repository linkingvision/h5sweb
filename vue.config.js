const webpack = require('webpack')
module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
       plugins: [
          new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "windows.jQuery":"jquery"
          })
        ]
    },
    assetsDir: 'static',
    devServer: {
      port: 1007,     // 端口
    },
    chainWebpack: config => {
        config
            .entry('index')
            .add('babel-polyfill')
    }
}
