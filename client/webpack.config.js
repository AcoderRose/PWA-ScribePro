const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    // starting points for the app
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },

    // settings for the output
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },

    // Plugins used in the build process
    plugins: [
      // Generates an HTML file based on the specified template and title
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE",
      }),

      // Creates the Webpack PWA manifest for the text editor application
      new WebpackPwaManifest({
        fingerprints: false, // Ensures the icon displays correctly in the application
        name: "JATE Text Editor",
        short_name: "JATE",
        description: "A text editor that can be accessed through a browser",
        background_color: "#36454F",
        theme_color: "#36454F",
        start_url: "./",
        publicPath: "./",
        display: "standalone",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),

      // Injects a service worker into the build using Workbox
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
    ],

    // Rules for processing various file types
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
