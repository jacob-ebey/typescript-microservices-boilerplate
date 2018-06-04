const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: {
    bundle: './lib/client.js'
  },
  output: {
    path: path.join(process.cwd(), 'public/js'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.graphql$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin()
  ]
}
