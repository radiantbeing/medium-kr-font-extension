const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const config = {
  entry: {
    popup: "./src/popup.js",
    "content-script": "./src/content-script.js",
    "service-worker": "./src/service-worker.js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./public", to: "." }],
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
    ],
  },
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "inline-source-map";
    config.devServer = {
      static: "./dist",
    };
  }

  return config;
};
