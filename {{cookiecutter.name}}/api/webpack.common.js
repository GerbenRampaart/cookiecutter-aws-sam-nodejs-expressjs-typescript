const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  plugins: [
    new Dotenv()
  ],
  module: {
    rules: [
      {
        exclude: [path.resolve(__dirname, "node_modules")],
        test: /\.ts$/,
        use: "ts-loader"
      },
      {
        exclude: /node_modules/,
        test: /\.graphql$/,
        use: [
          {
            loader: "graphql-import-loader"
          }
        ]
      }
    ]
  },
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "build")
  },
  resolve: {
    extensions: [".graphql", ".ts", ".js", ".json"]
  },
  target: "node"
};
