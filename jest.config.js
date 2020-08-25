module.exports = {
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        './src/processor/*.js',
        './rules/wx2bd/api/*',
        './rules/wx2bd/*.js',
        './rules/wx2wx/*.js',
        '!./rules/wx2bd/login.js',
        '!**/node_modules/**',
        '!**/vendor/**', './src/config/*'
    ],
    coverageDirectory: 'coverage'
};
