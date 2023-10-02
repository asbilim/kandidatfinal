module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/fileMock.js"
    },
    testEnvironment: 'jsdom'
};
  