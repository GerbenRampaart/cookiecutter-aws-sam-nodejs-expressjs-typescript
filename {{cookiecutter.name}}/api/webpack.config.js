const path = require('path');

const isProduction = typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? false : 'inline-source-map';

// https://www.atyantik.com/setting-up-webpack-with-typescript-part-3-2-the-novice-programmer/

module.exports = [
  {
    entry: './src/app.ts',
    target: 'node',
    mode,
    devtool,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },        
      ]
    },
    resolve: {
      extensions: [ '*', '.ts', '.mjs', '.js', '.json', '.gql', '.graphql' ]
    },
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'build')
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    mode: 'development'
  }
];