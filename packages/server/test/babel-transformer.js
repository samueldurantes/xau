const config = require('@xau/babel')

const { createTransformer } = require('babel-jest').default

module.exports = createTransformer({
  ...config,
})
