const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './client/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../client'),
      '@style': path.resolve(__dirname, '../client/assets/styles')
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
      },
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
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
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpe?g)$/,
        loader: 'url-loader',
        query: {
          limit: 4000,
          name: '[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader',
        query: {
          limit: 5000,
          name: '[name].[hash:8].[ext]'
        }
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    hot: true,
    open: true,
    compress: true,
    quiet: true,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new webpack.DefinePlugin({
      __DEV__: "process.env.NODE_ENV !== 'production'",
      __DSN__: JSON.stringify(
        'https://07cd1d95ceb547e08a4a94c17b83edd5@o383971.ingest.sentry.io/5214548'
      )
    })
  ]
};
