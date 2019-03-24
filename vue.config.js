if (process.env.NODE_ENV === 'production') {
  process.env.BASE_URL = '/punkapi/'
} else {
  process.env.BASE_URL = '/'
}

module.exports = {
  lintOnSave: true,
  publicPath: process.env.BASE_URL,
  outputDir: 'docs'
}
