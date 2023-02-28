module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory:'./reports/coverage',
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './reports/tests',
        filename: 'report.html',
        openReport: false,
      },
    ],
  ],
}
