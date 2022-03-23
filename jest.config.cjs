// jest.config.js
module.exports = {
  // [...]
  // Replace `ts-jest` with the preset you want to use
  // from the above list
  globals: {
    extensionsToTreatAsEsm: ['.ts', '.js'],
    'ts-jest': {
      useESM: true
    }
  },

  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testEnvironment: '<rootDir>/custom-test-env.cjs',
  transform: {},
};
