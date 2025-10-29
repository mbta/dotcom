const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const webpack = require("webpack");
const path = require("path");
const postcssPresetEnv = require("postcss-preset-env");

const babelLoader = {
  loader: "babel-loader",
  options: {
    configFile: "./babel.config.js",
    cacheDirectory: true
  }
};

const tsLoader = {
  loader: "ts-loader",
  options: {
    configFile: "tsconfig.webpack.json",
    transpileOnly: true,
    experimentalWatchApi: true
  }
};

module.exports = {
  entry: {
    app: ["./js/app-entry.js"],
    core: ["./js/core.js"], // For core.css only, not js
    map: ["./js/leaflet-css.js"], // For leaflet.css only, not js
    stop: ["./ts/stop-entry.ts"],
    leaflet: ["./ts/leaflet-entry.ts"],
    schedule: ["./ts/schedule-entry.ts"],
    projects: ["./ts/projects-entry.ts"]
  },

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
    reasons: false,
    source: false,
    timings: true,
    usedExports: true,
    version: true,
    warnings: true
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, "ts/"),
        exclude: [
          /__tests__/,
          path.resolve(__dirname, "ts/coverage"),
          path.resolve(__dirname, "ts/ts-build/")
        ],
        use: [babelLoader, tsLoader]
      },
      {
        test: /\.(js)$/,
        include: path.resolve(__dirname, "js/"),
        exclude: [path.resolve(__dirname, "js/test/")],
        use: babelLoader
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, "../priv/static/icon-svg"),
        use: [
          { loader: "svg-inline-loader" },
          {
            loader: "svgo-loader",
            options: {
              plugins: [
                {
                  name: "removeTitle",
                  active: false
                },
                {
                  name: "removeAttrs",
                  params: {
                    attrs: ["id"]
                  }
                },
                {
                  name: "sortAttrs",
                  active: false
                }
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, "css/"),
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              url: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("tailwindcss"),
                  postcssPresetEnv({
                    autoprefixer: { grid: true },
                    enableClientSidePolyfills: true
                  }),
                ]
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: [
                  "node_modules/bootstrap/scss",
                  "node_modules/@fortawesome/fontawesome-free/scss"
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
        terserOptions: {
          ecma: 5,
          format: {
            comments: false
          }
        },
        extractComments: false
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true }
            }
          ]
        }
      })
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: "../css/[name].css" }),
    new webpack.ProvidePlugin({
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
    alias: {
      // Metro's Flatpickr import briefly, optionally references jQuery without importing it, which breaks Webpack unless we add this line
      jquery: path.resolve(__dirname, "./node_modules/jquery")
    },
    symlinks: false,
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  }
};
