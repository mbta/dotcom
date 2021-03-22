const path = require("path");
const merge = require("webpack-merge");
const base = require("./webpack.config.base");

module.exports = env =>
  merge(base, {
    mode: "development",

    devtool: "cheap-inline-source-map",

    output: {
      publicPath: "http://localhost:8090/",
      path: path.resolve(__dirname, "../priv/static/css")
    },

    devServer: {
      host: "0.0.0.0",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      watchOptions: {
        poll: true,
        ignored: "/node_modules/"
      },
      writeToDisk: path => /\.css$/.test(path),
      port: env.port,
      contentBase: path.resolve(__dirname, "../priv/static/"),
      watchContentBase: true,
      compress: true,
      stats: {
        assets: false,
        builtAt: true,
        cachedAssets: true,
        chunkGroups: true,
        colors: true,
        entrypoints: false,
        env: true,
        errors: true,
        errorDetails: true,
        hash: true,
        modules: false,
        publicPath: false,
        progress: true,
        reasons: false,
        source: false,
        timings: true,
        usedExports: true,
        version: true,
        warnings: true
      },
      overlay: {
        errors: true,
        warnings: true
      }
    }
  });
