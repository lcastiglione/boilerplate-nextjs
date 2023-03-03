module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@core/(.*)$': ['<rootDir>/libs/$1'],
},
  coverageDirectory: '../../reports/coverage-core',
};
