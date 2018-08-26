module.exports = {
  context: __dirname,
  devtool: "inline-source-map",
  entry: "./src/index.ts",
  output: { filename: "pastel-lang.js" },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  stats: {
    warningsFilter: /export .* was not found in/
  }
};
