const path = require('path');

module.exports = {
	mode: 'development',
  // Die Eintrittspunkte für Ihre Anwendung
  entry: './src/index.js',

  // Konfiguration, wo die gebündelten Dateien abgelegt werden
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },

  // Konfiguration des Webpack-Entwicklungsservers
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000
  },

  // Konfiguration der Module und Loader
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
    ]
  }
};
