const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

let distDir = path.resolve(__dirname, "..", "dist")
let srcDir = path.resolve(__dirname, "..", "src")

module.exports = {
  entry: path.resolve(srcDir, 'index.ts'),
  output: {
    filename: "server-bundle.js",
    pathinfo: true,
    path: path.resolve(distDir),
  },
  target: 'node',

  module: {
    rules: [{
        test: /\.ts[x]?$/,
        use: [
          "babel-loader",
          "awesome-typescript-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  externals: [nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
  })],
};
