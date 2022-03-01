const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const postcssPresetEnv = require("postcss-preset-env");
const sass = require("sass");

const babelLoader = {
  loader: "babel-loader",
  options: {
    configFile: "./babel.config.js"
  }
};

const tsLoader = {
  loader: "ts-loader",
  options: {
    configFile: "tsconfig.webpack.json"
  }
};

module.exports = {
  entry: {
    app: ["./js/app-entry.js"],
    core: ["./js/core.js"], // For core.css only, not js
    map: ["./js/leaflet-css.js"], // For leaflet.css only, not js
    tnm: ["./ts/transit-near-me-entry.ts"],
    tripplanner: ["./ts/trip-planner-entry.ts"],
    stop: ["./ts/stop-entry.ts"],
    leaflet: ["./ts/leaflet-entry.ts"],
    schedule: ["./ts/schedule-entry.ts"],
    tripplanresults: ["./ts/trip-plan-results-entry.ts"],
    projects: ["./ts/projects-entry.ts"],
    iewarning: ["./ts/ie-warning-entry.ts"]
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
        use: [babelLoader, tsLoader]
      },
      {
        test: /\.(js)$/,
        exclude: [/node_modules/, path.resolve(__dirname, "ts/")],
        use: babelLoader
      },
      {
        // https://github.com/zeit/swr/issues/278
        test: /\/node_modules\/swr\//,
        use: [babelLoader, tsLoader]
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
              plugins: () => [
                postcssPresetEnv({
                  autoprefixer: { grid: true }
                })
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              implementation: sass, // Prefer `dart-sass`
              sassOptions: {
                includePaths: [
                  "node_modules/bootstrap/scss",
                  "node_modules/font-awesome/scss"
                ],
                outputStyle: "compressed",
                quietDeps: true
              }
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
    new CopyWebpackPlugin([
      { from: "static/**/*", to: "../../" },
      { from: "node_modules/focus-visible/dist/focus-visible.min.js", to: "../js" },
      { from: "node_modules/smoothscroll-polyfill/dist/smoothscroll.min.js", to: "../js" },
    ], {}),
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
