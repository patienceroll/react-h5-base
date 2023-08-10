const { override, addWebpackAlias } = require('customize-cra');
const path = require('path')

console.log(path.resolve(__dirname, 'src'))

module.exports = override(addWebpackAlias({
  "@": path.resolve(__dirname, 'src')
}))