const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { SubresourceIntegrityPlugin } = require("webpack-subresource-integrity");
const TerserPlugin = require("terser-webpack-plugin");

const webpack = require("webpack");
const path = require("path");
const postcssPresetEnv = require("postcss-preset-env");
const sass = require("sass");


const babelLoader = {
  loader: "babel-loader",
  options: {
    configFile: path.resolve(__dirname, 'babel.config.js'),
  }
};

const tsLoader = {
  loader: "ts-loader",
  options: {
    configFile: path.resolve(__dirname, 'tsconfig.webpack.json')
  }
};


/**
 * Special configuration that outputs JavaScript, CSS, and static assets
 * for the MBTA.com header and footer. 
 * 
 * When run in both production and development modes, outputs with minified and 
 * unminified versions, with sourcemaps. Also sets a hash for the filenames, 
 * and outputs head.html and script.html containing the appropriate <link> and 
 * <script> HTML tags linked to the output files.
 */
module.exports = (env, argv) => {
  const plugins = (argv.mode !== 'development') ? [
    new CopyWebpackPlugin({ patterns: [
          { from: "static/fonts/*", to: "fonts/[name].[ext]" },
          { from: "static/favicon.ico", to: "favicon.ico" },
          { from: "static/images/mbta-logo.svg", to: "images/mbta-logo.svg" },
          { from: "static/images/mbta-name-and-logo.svg", to: "images/mbta-name-and-logo.svg" },
        ]}),
    new SubresourceIntegrityPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      filename: "head.html",
      minify: false,
      templateContent: ({ htmlWebpackPlugin }) => `<head>\n${htmlWebpackPlugin.tags.headTags}\n</head>`
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: "scripts.html",
      minify: false,
      templateContent: ({ htmlWebpackPlugin }) => `${htmlWebpackPlugin.tags.bodyTags}`
    })
  ] : [];

  return ({
    entry: ["./export-headerfooter.js", "./css/export-headerfooter.scss"],

    mode: "production",

    output: {
      path: path.resolve(__dirname, argv.outputPath ? argv.outputPath: "../../../../dotcomchrome"),
      filename: argv.mode === 'development' ? 'header.[contenthash].js' : 'header.[contenthash].min.js',
      crossOriginLoading: 'anonymous'
    },

    devtool: 'source-map',

    module: {
      rules: [
        {
          test: /\.(ts)$/,
          exclude: [/node_modules/],
          use: [babelLoader, tsLoader]
        },
        {
          test: /\.(js)$/,
          exclude: ['/node_modules/'],
          use: babelLoader,
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: argv.mode === 'development',
                importLoaders: 1,
                url: false
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: argv.mode === 'development',
                postcssOptions: {
                  plugins: [
                    postcssPresetEnv({
                      autoprefixer: { grid: true }
                    })
                  ]
                }
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: argv.mode === 'development',
                implementation: sass,
                sassOptions: {
                  includePaths: [
                    "node_modules/bootstrap/scss",
                    "node_modules/font-awesome/scss"
                  ],
                  outputStyle: argv.mode === 'development' ? "compressed" : "expanded",
                  quietDeps: true
                }
              },
            },
          ],
        }
      ]
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: argv.mode === 'development' ? 'styles.[contenthash].css' : 'styles.[contenthash].min.css'
      }),
      new webpack.ProvidePlugin({
        Turbolinks: "turbolinks",
        Tether: "tether",
        "window.Tether": "tether",
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "window.$": "jquery"
      })
    ].concat(plugins),

    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            compress: {
              drop_console: argv.mode !== 'development',
            },
            format: {
              comments: false,
            },
          },
          extractComments: false
        }),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              "default",
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        })
      ],
    },

    resolve: {
      extensions: [".ts", ".js"]
    }
  })
};
