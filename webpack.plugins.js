const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin'); //Webpack plugin that runs TypeScript type checker on a separate process

//Plugins
module.exports = [
  new ForkTsCheckerWebpackPlugin(),  
];

