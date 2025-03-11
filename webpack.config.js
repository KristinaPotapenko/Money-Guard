const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";
const target = devMode ? "web" : "browsersList";
const devtool = devMode ? "eval-cheap-module-source-map" : "undefined";

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    open: {
      target: ["index.html"],
    },
    hot: true,
    port: 8080,
  },
  entry: ["@babel/polyfill", path.resolve(__dirname, "src", "index.js")],
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "bundle.js",
    assetModuleFilename: "assets/[name][ext]",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src", "index.html"),
      scriptLoading: "defer",
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      filename: "sign-up.html",
      template: path.resolve(__dirname, "src", "sign-up.html"),
      scriptLoading: "defer",
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      filename: "password-change-email.html",
      template: path.resolve(__dirname, "src", "password-change-email.html"),
      scriptLoading: "defer",
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      filename: "password-change-code.html",
      template: path.resolve(__dirname, "src", "password-change-code.html"),
      scriptLoading: "defer",
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      filename: "password-change-newPassword.html",
      template: path.resolve(
        __dirname,
        "src",
        "password-change-newPassword.html"
      ),
      scriptLoading: "defer",
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      filename: "user-information.html",
      template: path.resolve(__dirname, "src", "user-information.html"),
      scriptLoading: "defer",
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      filename: "add-card.html",
      template: path.resolve(__dirname, "src", "add-card.html"),
      scriptLoading: "defer",
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      filename: "cards-information.html",
      template: path.resolve(__dirname, "src", "cards-information.html"),
      scriptLoading: "defer",
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      filename: "card-information.html",
      template: path.resolve(__dirname, "src", "card-information.html"),
      scriptLoading: "defer",
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      filename: "add-transaction.html",
      template: path.resolve(__dirname, "src", "add-transaction.html"),
      scriptLoading: "defer",
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      filename: "update-card-information.html",
      template: path.resolve(__dirname, "src", "update-card-information.html"),
      scriptLoading: "defer",
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      filename: "transactions.html",
      template: path.resolve(__dirname, "src", "transactions.html"),
      scriptLoading: "defer",
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      filename: "verify.html",
      template: path.resolve(__dirname, "src", "verify.html"),
      scriptLoading: "defer",
      inject: "body",
      publicPath: "/",
    }),
    new HtmlWebpackPlugin({
      filename: "dashboard.html",
      template: path.resolve(__dirname, "src", "dashboard.html"),
      scriptLoading: "defer",
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "style.min.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff2?|ttf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
      {
        test: /\.(?:js|mjs|cjs)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.(?:js|mjs|cjs)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
};
