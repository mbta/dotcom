const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { SubresourceIntegrityPlugin } = require("webpack-subresource-integrity");
const PurgecssPlugin = require("purgecss-webpack-plugin");

const path = require("path");
const glob = require("glob");
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
 * When run in both production and development modes, outputs with minified CSS and 
 * unminified CSS and JS, with sourcemaps. Also sets a hash for the filenames, 
 * and outputs head.html and script.html containing the appropriate <link> and 
 * <script> HTML tags linked to the output files.
 */
module.exports = (env, argv) => {
  const outputPath = path.resolve(__dirname, argv.outputPath ? argv.outputPath: "../../../../dotcomchrome");

  return ({
    mode: "production",
    entry: ["./export-headerfooter.ts"],
    output: {
      path: outputPath,
      filename: 'header.[contenthash].js', // css gets loaded through here
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
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1,
                url: false
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
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
                sourceMap: true,
                implementation: sass,
                sassOptions: {
                  includePaths: [
                    "node_modules/bootstrap/scss",
                    "node_modules/font-awesome/scss"
                  ],
                  outputStyle: "expanded",
                  quietDeps: true
                }
              },
            },
          ],
        }
      ]
    },

    plugins: [
      // extract CSS out of code, twice because we'll minify one
      new MiniCssExtractPlugin({
        filename: 'styles.[contenthash].min.css'
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.[contenthash].css'
      }),

      // copy images and fonts
      new CopyWebpackPlugin({ patterns: [
            { from: "static/fonts/*", to: "fonts/[name][ext]" },
            { from: "static/favicon.ico", to: "favicon.ico" },
            { from: "static/images/mbta-logo.svg", to: "images/mbta-logo.svg" },
            { from: "static/images/mbta-name-and-logo.svg", to: "images/mbta-name-and-logo.svg" },
          ]}),

      // add integrity attribute to linked resources
      new SubresourceIntegrityPlugin(),

      // write file with <link> tag to CSS
      new HtmlWebpackPlugin({
        inject: false,
        filename: "head.html",
        scriptLoading: "blocking",
        minify: false,
        templateContent: ({ htmlWebpackPlugin }) => `<head>\n${htmlWebpackPlugin.tags.headTags[0]}\n</head>`
      }),

      // write file with <script> tag to JS
      new HtmlWebpackPlugin({
        inject: false,
        filename: "scripts.html",
        scriptLoading: "blocking",
        minify: false,
        templateContent: ({ htmlWebpackPlugin }) => `${htmlWebpackPlugin.tags.bodyTags}`
      }),

      // purge CSS based on HTML
      new PurgecssPlugin({
        fontFace: true, // remove unused @font-face
        keyframes: true, // remove unused keyframes
        paths: glob.sync(`${outputPath}/*.html`, { nodir: true }),
        rejected: true, // list removed things in stats
        variables: true, // remove unused --custom-properties
        dynamicAttributes: ["aria-expanded", "href"]
      }),
    ],

    optimization: {
      // only minimize the .min.css file
      minimizer: [
        new CssMinimizerPlugin({
          include: /min/,
          minimizerOptions: { preset: ["default", {
            discardComments: { removeAll: true },
          }] }
        })
      ],
    },

    resolve: {
      extensions: [".ts", ".js"]
    },

    // this should have been removed as its only relevant to ununsed module code
    externals: {
      react: 'React'
    }
  })
};
