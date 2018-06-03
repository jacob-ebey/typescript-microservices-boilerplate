const path = require('path')

module.exports = {
  entry: './lib/client.js',
  output: {
    path: path.join(process.cwd(), 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }]
  }
}
