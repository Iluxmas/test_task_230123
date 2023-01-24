const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

let mode = "development"; // По умолчанию режим development
let target = "web";
if (process.env.NODE_ENV === "production") {
  // Режим production, если
  // при запуске вебпака было указано --mode=production
  mode = "production";
  target = "browserslist";
}

const plugins = [
  new HtmlWebpackPlugin({
    template: "./public/index.html", // Данный html будет использован как шаблон
  }),
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css", // Формат имени файла
  }), // Добавляем в список плагинов
];

if (process.env.SERVE) {
  // Используем плагин только если запускаем devServer
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  mode,
  target,
  plugins,
  entry: { main: "./src/index.js" }, // Указываем точку входа - главный модуль приложения,
  // в который импортируются все остальные
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js", // Директория, в которой будет размещаться итоговый бандл, папка dist в корне приложения
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true, // Очищает директорию dist
  },

  devServer: {
    static: path.resolve(__dirname, "./dist"),
    compress: true,
    port: 8080,
    open: true,
    hot: true, // Включает автоматическую перезагрузку страницы при изменениях
  },

  module: {
    rules: [
      { test: /\.(html)$/, use: ["html-loader"] },
      {
        test: /\.css$/i, // /\.(le|c)ss$/i если вы используете less
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: mode === "production" ? "asset" : "asset/resource", // В продакшен режиме
        // изображения размером до 8кб будут инлайнится в код
        // В режиме разработки все изображения будут помещаться в dist/assets
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/, // не обрабатываем файлы из node_modules
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true, // Использование кэша для избежания рекомпиляции
            // при каждом запуске
          },
        },
      }, // Добавляем загрузчик для html
    ],
  },
};
