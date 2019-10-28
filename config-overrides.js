module.exports = {
  webpack (config, env) {
    // loader
    config.module.rules[2].oneOf.unshift({
      test: /\.less$/,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            modules: true,
            localIdentName: '[name]__[local]--[hash:base64:5]'
          }
        },
        require.resolve('less-loader')
      ]
    });
    return config;
  }
};
