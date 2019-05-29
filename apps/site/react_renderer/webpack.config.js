const path = require("path");

module.exports = {
  entry: {
    app: ["./app.js"]
  },

  target: "node",

  mode: "production",

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }, {
          loader: "ts-loader", options: {
            configFile: path.resolve(__dirname, "../assets/tsconfig.webpack.json")
          }
        }]
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
              externalConfig: path.resolve(__dirname, "../assets/svgo.yml")
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      react: path.resolve(__dirname, "../assets/node_modules/react")
    }
  },

  output: {
    path: path.resolve(__dirname, "./dist")
  }

};
