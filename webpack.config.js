const path = require('path');

module.exports = {
  entry: './src/index.js',
  externals: {
    'react': 'commonjs react'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        exclude: /^\/(?:build|node_modules)/,
        include: path.resolve(__dirname, 'src'),
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ 'env' ]
          }
        }
      }
    ]
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'build')
  }
};
