module.exports = {
  reporters: ['default', 'jest-junit'],
  coverageReporters: ['json-summary'],
  collectCoverage: true,
  collectCoverageFrom: [
    'features/**/*.js',
    'lib/**/*.js',
    'hooks/**/*.js',
    'components/**/*.jsx',
    'layouts/**/*.jsx',
    'pages/**/*.jsx',
  ],
}
