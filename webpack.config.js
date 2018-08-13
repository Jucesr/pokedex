const path = require('path')
const webpack = require('webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
  const isProduction = env === 'production';
  return {
    entry: './src/index',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },{
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }]
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname ,'public'),
      historyApiFallback: true
    }
  }
}
