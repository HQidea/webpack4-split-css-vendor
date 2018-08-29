const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  context: __dirname,
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  entry: {
    app: './src/index.js'
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve('dist')
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
    rules: [
      {
        test: /\.(less|css)$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',

            options: {
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],

  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        styles: {
          name: 'app',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
          priority: 10
        },
        commons: {
          // test: module =>
          //   /[\\/]node_modules[\\/]/.test(module.resource) &&
          //   module.constructor.name !== 'CssModule',
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
};

module.exports = config;
