module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './reports/tests',
        filename: 'report.html',
        openReport: true,
      },
    ],
  ],
}
