import type { Configuration } from "webpack";
import path from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";

const config: Configuration = {
  context: path.resolve(__dirname, "src"),
  entry: "./index.ts",
  mode: "development",
  output: {
    filename: "index.js",
    publicPath: ".",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".tsx", ".ts"],
  },
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [{ test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" }],
  },
};

export default config;
