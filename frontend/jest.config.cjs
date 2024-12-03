module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',  // Мок для CSS файлів
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',  // Мок для SVG файлів
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
