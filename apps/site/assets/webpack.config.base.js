const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  entry: {
    polyfill: "./js/babel-polyfill.js",
    app: ["./js/app-entry.js"],
    core: ["./js/core.js"], // For core.css only, not js
    map: ["./js/leaflet-css.js"], // For leaflet.css only, not js
    tnm: ["./ts/transit-near-me-entry.ts"],
    tripplanner: ["./ts/trip-planner-entry.ts"],
    stop: ["./ts/stop-entry.ts"],
    leaflet: ["./ts/leaflet-entry.ts"],
    schedule: ["./ts/schedule-entry.ts"],
    tripplanresults: ["./ts/trip-plan-results-entry.ts"],
    projects: ["./ts/projects-entry.ts"]
  },

  node: {
    console: false,
    fs: "empty",
    net: "empty",
    tls: "empty"
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/],
        use: [
          { loader: "babel-loader" },
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.webpack.json"
            }
          }
        ]
      },
      {
        test: /\.(js)$/,
        exclude: [/node_modules/, path.resolve(__dirname, "ts/")],
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.svg$/,
        use: [
          { loader: "svg-inline-loader" },
          {
            loader: "svgo-loader",
            options: {
              externalConfig: "svgo.yml"
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: { importLoaders: 1 }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [postcssPresetEnv()]
            }
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: [
                "node_modules/bootstrap/scss",
                "node_modules/font-awesome/scss"
              ],
              precision: 8
            }
          }
        ]
      }
    ]
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          ecma: 5,
          safari10: true // You scoundrel you
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  plugins: [
    new CopyWebpackPlugin([{ from: "static/**/*", to: "../../" }], {}),
    new MiniCssExtractPlugin({ filename: "../css/[name].css" }),
    new webpack.ProvidePlugin({
      Turbolinks: "turbolinks",
      Tether: "tether",
      "window.Tether": "tether",
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "window.$": "jquery",
      phoenix: "phoenix",
      autocomplete: "autocomplete.js"
    })
  ],

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  }
};
