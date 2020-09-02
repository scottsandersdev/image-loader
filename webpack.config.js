const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  devtool: isDev ? "source-map" : "",
  entry: "./src/js/index.js",
  devServer: {
    host: "127.0.0.1",
    open: "Google Chrome",
    overlay: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: isDev },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: isDev },
          },
        ],
      },
      {
        test: /\.(woff|jpg|svg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/static/index.html",
      filename: "./index.html",
      favicon: "src/static/favicon.ico",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};
