const path = require("path");
const { merge } = require("webpack-merge");
const base = require("./webpack.config.base");
const webpack = require("webpack");

module.exports = env =>
  merge(base, {
    mode: "production",

    output: {
      path: path.resolve(__dirname, "../priv/static/js"),
      filename: "[name].js",
      publicPath: "/"
    },

    devtool: "source-map",

    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          default: false,
          defaultVendors: false,
          // Set our own cacheGroups instead of using the default groups
          // Since all entrypoints are dependent on the app entrypoint
          vendor: {
            name: "vendors",
            test: /[\\/]node_modules[\\/](?!react)/
          },
          react: {
            name: "react",
            test: /[\\/]node_modules[\\/]react/
          }
        }
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        SENTRY_DSN: JSON.stringify(env.SENTRY_DSN),
        __SENTRY_DEBUG__: false
      })
    ]
  });
