const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "development", // Change this to "production" for production builds
  devServer: {
    static: "./dist",
    hot: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        // Regular CSS (non-module)
        test: /\.css$/,
        exclude: /\.module\.css$/, // Exclude CSS Modules
        use: [
          process.env.NODE_ENV === "production" ? MiniCssExtractPlugin.loader : "style-loader", // Use style-loader in development for hot-reloading
          "css-loader",
        ],
      },
      {
        // CSS Modules
        test: /\.module\.css$/,
        use: [
          process.env.NODE_ENV === "production" ? MiniCssExtractPlugin.loader : "style-loader", // Use style-loader in development for hot-reloading
          {
            loader: "css-loader",
            options: {
              modules: true, // Enable CSS Modules
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
};

// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// module.exports = {
//   entry: "./src/index.tsx",
//   output: {
//     filename: "bundle.js",
//     path: path.resolve(__dirname, "dist"),
//     clean: true,
//   },
//   mode: "development",
//   devServer: {
//     static: "./dist",
//     hot: true,
//   },
//   resolve: {
//     extensions: [".tsx", ".ts", ".js"],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(ts|tsx)$/,
//         use: "babel-loader",
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.css$/,
//         use: [MiniCssExtractPlugin.loader, "css-loader"],
//       },
//       {
//         test: /\.module\.css$/,
//         use: [
//           "style-loader", // or 'MiniCssExtractPlugin.loader' for production
//           "css-loader?modules", // Enable CSS Modules
//         ],
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./public/index.html",
//     }),
//     new MiniCssExtractPlugin(),
//   ],
// };
