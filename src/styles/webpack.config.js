const path = require("path");

module.exports = {
  entry: "./src/test.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/build"),
  },
  mode: "none",
  rules: [
    {
      test: /.jsx?$/,
      include: [path.resolve(__dirname, "src")],
      exclude: [path.resolve(__dirname, "node_modules")],
      loader: "babel-loader",
    },
    {
      test: /.css?$/,
      exclude: [],
      //로더는 오른쪽부터 읽어들이므로 postcss-loader를 맨 오른쪽에 넣어준다.
      use: ["style-loader", "css-loader", "postcss-loader"],
    },
  ],
};
