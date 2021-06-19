const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/main.ts",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js"
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      },
      {
        test: /\.(png|jpg|webp|webm|mp4|ogg|mp3)$/,
        use: "file?context=src&name=[path][name].[ext]"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new CopyWebpackPlugin(["static/**/*"])
  ],
  devServer: {
    host: "localhost",
    port: 9000,
    contentBase: "build"
  }
};
