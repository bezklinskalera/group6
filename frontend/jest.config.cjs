module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',  // Мок для CSS файлів
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',  // Мок для SVG файлів
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};

/*nnkj*/
