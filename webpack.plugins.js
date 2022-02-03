const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin'); //Webpack plugin that runs TypeScript type checker on a separate process
const Dotenv = require('dotenv-webpack'); //For enviroment variables

//Plugins
module.exports = [
  new ForkTsCheckerWebpackPlugin(),  
  new Dotenv(),
];

