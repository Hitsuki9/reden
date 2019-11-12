const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, '../client/index.tsx')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../client')
    },
    modules: ['node_modules'],
    extensions: ['.js', '.tsx', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: path.resolve(__dirname, '../client'),
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }, {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            }
          },
          'postcss-loader',
          'less-loader'
        ],
        exclude: path.resolve(__dirname, '../client/assets/styles')
      }, {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ],
        include: path.resolve(__dirname, '../client/assets/styles')
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.(png|jpe?g)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 4000,
          name: '[name].[hash:8].[ext]'
        }
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    host: '127.0.0.1',
    port: 3000,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};
