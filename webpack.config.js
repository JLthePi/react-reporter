const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './public/index.html',
  inject: false,
})

const inlineChunkHtmlPlugin = new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [
  'bundle.js',
])

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [htmlWebpackPlugin, inlineChunkHtmlPlugin],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
}
