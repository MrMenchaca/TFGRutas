//Este archivo define la configuración del "main process", es decir, la ventana. Lo que simula ser 
//el navegador, pero que es una aplicación de escritorio
const rules = require('./webpack.rules');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.ts',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json']
  },
  target: 'electron-main',
};