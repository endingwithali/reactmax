// Import path for resolving file paths
var path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  // Specify the entry point for our app.
  entry: [path.join(__dirname, "./scripts/content.js")],
  // Specify the output file containing our bundled code.
  output: {
    path: __dirname,
    filename: "bundle.js",
  },
  // Enable WebPack to use the 'path' package.
  resolve: {
    fallback: { path: require.resolve("path-browserify") },
  },
  optimization: {
    minimize: false
},  plugins: [
    new Dotenv()
  ],
  /**
  * In Webpack version v2.0.0 and earlier, you must tell 
  * webpack how to use "json-loader" to load 'json' files.
  * To do this Enter 'npm --save-dev install json-loader' at the 
  * command line to install the "json-loader' package, and include the 
  * following entry in your webpack.config.js.
  * module: {
    rules: [{test: /\.json$/, use: use: "json-loader"}]
  }
  **/
};
