const path = require('path')
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  rootDir: path.resolve(__dirname, './'),
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  coverageDirectory: '<rootDir>/tests/unit/coverage', // 覆盖率报告的目录
  collectCoverageFrom: [
    // 测试报告想要覆盖那些文件，目录，前面加！是避开这些文件
    // 'src/components/**/*.(js|vue)',
    'src/components/*.(vue)',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**'
  ]
}
