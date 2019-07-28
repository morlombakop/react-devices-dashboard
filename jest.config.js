module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/index.js',
    '!src/theme.json',
    '!src/global-styles.js',
    '!src/i18n*',
    '!src/config/api-endpoint.js',
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  setupFiles: ['raf/polyfill'],
  testRegex: '__tests__/.*\\.test\\.(js|jsx)',
  snapshotSerializers: [],
};
