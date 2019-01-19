const { jsWithBabel } = require('ts-jest/presets')

module.exports = {
  transform: {
    ...jsWithBabel.transform,
  },
  globals: {
    'ts-jest': { tsConfig: 'tsconfig.test.json' },
  },
  testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // transformIgnorePatterns: ['/node_modules/(?!(@smt)/).*/'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/index.tsx'],
}
