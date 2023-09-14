const path = require("path");
const { merge } = require("webpack-merge");
const base = require("./webpack.config.base");

const config = merge(base, {
  mode: "production",
  target: "node",
  output: {
    path: path.resolve(__dirname, "../react_renderer/dist")
  }
});

config["entry"] = {
  app: ["./react_app.js"]
};

delete config["node"];
delete config["optimization"];
delete config["plugins"];

module.exports = () => config;
