module.exports = {
  presets: [
    "react-app"
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'react-vant',
        libraryDirectory: 'es',
        style: false,
      },
    ],
  ],
};