const production = process.env.NODE_ENV === "production"

module.exports = {
  lintOnSave: true,
  publicPath: production ? '/punkapi' : '/' ,
  outputDir: 'docs'
}
