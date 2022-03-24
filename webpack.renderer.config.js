//Este archivo define la configuración del "render process", es decir, la aplicación. La propia aplicación de rutas
//y los componentes que cargo a traves de react. Lo que se vería en un navegador cualquiera
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  module: {
    rules,
  },
  target: 'electron-renderer',
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  },
};
