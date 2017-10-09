const webpack = require("webpack");
const path = require("path");
const reactExternal = {
  root: "React",
  commonjs2: "react",
  commonjs: "react",
  amd: "react"
};
const reduxFormExternal = {
  root: "Redux-Form",
  commonjs2: "redux-form",
  commonjs: "redux-form",
  amd: "redux-form"
};
module.exports = {
  entry: ["./src/index.js"],
  externals: {
    react: reactExternal,
    "redux-form": reduxFormExternal
  },
  output: {
    filename: "index.js",
    path: __dirname + "/dist"
  },
  resolve: {
    extensions: [".js"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new webpack.NamedModulesPlugin()]
};
