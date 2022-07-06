module.exports = {
  preset: 'ts-jest',
  testEnvironment: './test/environment/mongodb.ts',
  setupFiles: ['./test/jest.setup.js'],
  transform: {
    '^.+\\.(js|ts|tsx)?$': '<rootDir>/test/babel-transformer',
  },
}
