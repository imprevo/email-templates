const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  entry: './src/playground',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      jsdom: false,
    },
  },
  externals: ['jsdom'],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
    ],
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    client: {
      overlay: true,
    },
  },
  plugins: [new HtmlWebpackPlugin()],
};
