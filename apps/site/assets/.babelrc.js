module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: 2
      }
    ]
  ],

  plugins: ["@babel/plugin-transform-async-to-generator"]
};
