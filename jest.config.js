module.exports = {
  reporters: ['default', 'jest-junit'],
  coverageReporters: ['html', 'json-summary'],
  collectCoverage: true,
  collectCoverageFrom: [
    'features/**/*.js',
    'lib/**/*.js',
    'hooks/**/*.js',
    'components/**/*.jsx',
    'layouts/**/*.jsx',
    'pages/**/*.jsx',
  ],
  moduleDirectories: ['node_modules', '.'],
}
