module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: './reports/coverage',
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
  projects: [
    {
      preset: 'ts-jest',
      testEnvironment: 'node',
      displayName: 'core',
      testMatch: ['<rootDir>/packages/core/src/**/*.test.ts'],
      moduleNameMapper: {
        "@core/(.*)": "<rootDir>/packages/core/src/$1"
      }
    }
  ]
};
