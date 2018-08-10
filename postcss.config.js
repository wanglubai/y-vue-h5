module.exports = {
  plugins: [
    require('postcss-px2rem')({remUnit: 100}),
    require('autoprefixer')({
      browsers: ['> 1%']
    }),
    require('postcss-flexadapter')
  ]
};