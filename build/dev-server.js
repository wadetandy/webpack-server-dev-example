#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')

const serverConfig = require('../config/webpack-config-server')

serverConfig.entry = [
  'webpack/hot/poll?1000',
  serverConfig.entry
]

serverConfig.plugins = serverConfig.plugins || []
serverConfig.plugins = serverConfig.plugins.concat([
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
      "process.env": {
          "BUILD_TARGET": JSON.stringify('server')
      }
  }),
])

compiler = webpack(serverConfig)

compiler.outputFileSystem = new MemoryFs()

let outputOptions = serverConfig.stats
let lastHash

if (typeof outputOptions === "boolean" || typeof outputOptions === "string") {
  outputOptions = statsPresetToOptions(outputOptions)
} else if(!outputOptions) {
  outputOptions = {};
}

outputOptions.colors = require("supports-color");
outputOptions.cached = false
outputOptions.cachedAssets = false

function compilerCallback(err, stats) {
  if(err) {
    // Do not keep cache anymore
    compiler.purgeInputFileSystem()

    lastHash = null
    console.error(err.stack || err)
    if (err.details) console.error(err.details)
    process.exit(1); // eslint-disable-line
  }

  if (stats.hash !== lastHash) {
    lastHash = stats.hash;
    var statsString = stats.toString(outputOptions);
    if (statsString)
      process.stdout.write(statsString + "\n");
  }
}

compiler.watch(true, compilerCallback);
