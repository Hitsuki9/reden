module.exports = function (api) {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ]

  const plugins = [
    '@babel/plugin-transform-runtime',
    'react-hot-loader/babel',
    ['import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    }]
  ]

  return {
    presets,
    plugins
  }
}
