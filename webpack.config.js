const path = require('path');

module.exports = {
  entry: {
    index: './src/create-multi-context.js',
    withContext: './src/with-context'
  },
  externals: {
    'react': {
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react',
      root: 'React'
    }
  },
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /^\/node_modules\//,
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  output: {
    filename: '[name].js',
    library: 'react-multi-context',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'build'),
    umdNamedDefine: true
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react')
    }
  }
};
