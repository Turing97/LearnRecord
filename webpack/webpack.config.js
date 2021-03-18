const path = require('path')

module.exports = {
  mode: 'development',
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      // {
      //   // js使用babel
      //   test: '/\.js$/',
      //   // 使用哪个loader
      //   use: 'babel-loader',
      //   // 不包括的路径
      //   exclude: /node_modules/
      // }
    ]
  }
}
