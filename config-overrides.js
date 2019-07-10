const webpack = require('webpack')

module.exports = function override(config, env) {
  if (!config.plugins) {
    config.plugins = []
  }

  config.plugins.push(
    new webpack.IgnorePlugin(/\.(test|spec)\./)
  )

  return config
}
