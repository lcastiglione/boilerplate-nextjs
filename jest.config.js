module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './tests-report',
        filename: 'report.html',
        openReport: true,
      },
    ],
  ],
}
