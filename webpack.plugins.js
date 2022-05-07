const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin'); //Webpack plugin that runs TypeScript type checker on a separate process
const CopyWebpackPlugin = require("copy-webpack-plugin");

//Plugins
module.exports = [
  new ForkTsCheckerWebpackPlugin(), 
  new CopyWebpackPlugin({
    patterns: [
      {from: "./images", to: "images"}
    ]
  }), 
];

