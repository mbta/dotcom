const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");

const path = require("path");
const glob = require("glob");
const sass = require("sass");
const postcssPresetEnv = require("postcss-preset-env");

const babelLoader = {
  loader: "babel-loader",
  options: {
    configFile: path.resolve(__dirname, "babel.config.js")
  }
};

const tsLoader = {
  loader: "ts-loader",
  options: {
    configFile: path.resolve(__dirname, "tsconfig.webpack.json"),
    transpileOnly: true
  }
};

/**
 * Special configuration that outputs JavaScript, CSS, and static assets
 * for the MBTA.com header and footer.
 *
 * When run in both production and development modes, outputs with minified CSS and
 * unminified CSS and JS, with sourcemaps and hashed filenames. The asset
 * manifest identifies the output files. The Mix task generates HTML snippets
 * and previews using that manifest.
 */
module.exports = (env, argv) => {
  const outputPath = path.resolve(
    __dirname,
    argv.outputPath ? argv.outputPath : "../../../../dotcomchrome"
  );

  return {
    mode: "production",
    entry: {
      dotcomchrome: "./export-headerfooter.ts"
    },
    output: {
      path: outputPath,
      filename: "header.[contenthash].js", // css gets loaded through here
      crossOriginLoading: "anonymous"
    },

    devtool: "source-map",

    module: {
      rules: [
        {
          test: /\.(ts)$/,
          exclude: [/node_modules/],
          use: [babelLoader, tsLoader]
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 2,
                url: false,
                esModule: true,
                modules: {
                  // namedExport: true,
                  localIdentName: "mbta__dotcomchrome__[local]"
                }
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                postcssOptions: {
                  plugins: [
                    require("tailwindcss"),
                    postcssPresetEnv({
                      autoprefixer: { grid: true },
                      enableClientSidePolyfills: true
                    })
                  ]
                }
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                implementation: sass,
                api: "modern",
                sassOptions: {
                  loadPaths: [
                    __dirname,
                    path.resolve(__dirname, "node_modules/bootstrap"),
                    path.resolve(
                      __dirname,
                      "node_modules/@fortawesome/fontawesome-free"
                    ),
                    path.resolve(__dirname, "vendor")
                  ],
                  style: "expanded",
                  quietDeps: true
                }
              }
            }
          ]
        }
      ]
    },

    plugins: [
      // extract CSS out of code, twice because we'll minify one
      new MiniCssExtractPlugin({
        filename: "styles.[contenthash].min.css"
      }),
      new MiniCssExtractPlugin({
        filename: "styles.[contenthash].css"
      }),

      // copy images and fonts
      new CopyWebpackPlugin({
        patterns: [
          { from: "../priv/static/fonts/*", to: "fonts/[name][ext]" },
          {
            from: "node_modules/@fortawesome/fontawesome-free/webfonts/*",
            to: "fonts/[name][ext]",
            force: true,
            priority: 1
          },
          { from: "../priv/static/favicon.ico", to: "favicon.ico" },
          {
            from: "../priv/static/icon-svg/mbta-logo.svg",
            to: "images/mbta-logo.svg"
          },
          {
            from: "../priv/static/icon-svg/mbta-name-and-logo.svg",
            to: "images/mbta-name-and-logo.svg"
          },
          {
            from: "../priv/static/images/mbta-logo-t-favicon.png",
            to: "images/mbta-logo-t-favicon.png"
          },
          {
            from: "../priv/static/images/mbta-logo-t-180.png",
            to: "images/mbta-logo-t-180.png"
          }
        ]
      }),

      // purge CSS based on HTML
      // depends on header.html and footer.html already being present at the outputPath.
      new PurgeCSSPlugin({
        // PurgeCSS can miss font families used by Sass @extend selector groups.
        fontFace: false,
        keyframes: true, // remove unused keyframes
        paths: [
          ...glob.sync(`${outputPath}/*.html`, { nodir: true }),
          ...glob.sync(`${outputPath}/languages/*.html`, { nodir: true })
        ],
        rejected: true, // list removed things in stats
        variables: true, // remove unused --custom-properties
        safelist: {
          standard: [/c-modal__cover/],
          greedy: [
            /data-nav/,
            /data-search-open/,
            /aria-expanded/,
            /href/,
            /m-menu/,
            /m-footer/
          ]
        },
        dynamicAttributes: [
          "aria-expanded",
          "href",
          "data-search-open",
          "data-nav-open",
          "data-nav"
        ]
      }),

      new WebpackAssetsManifest({
        integrity: true
      })
    ],

    optimization: {
      // only minimize the .min.css file
      minimizer: [
        new CssMinimizerPlugin({
          include: /min/,
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

    resolve: {
      extensions: [".ts", ".js"]
    }
  };
};
