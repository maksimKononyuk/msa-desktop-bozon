module.exports = {
  renderer: {
    entry: './src/renderer/javascripts/index.js',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/react', '@babel/preset-env']
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'react-image-element-loader',
          exclude: /node_modules/
        }
      ]
    }
  },
  preload: {
    entry: './src/preload/index.js'
  },
  main: {
    entry: './src/main/index.js'
  }
}
