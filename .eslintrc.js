module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint-config-airbnb', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'import'],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  globals: {
    __DEV__: 'readonly',
    __DSN__: 'readonly'
  },
  rules: {
    'no-console': [
      1,
      {
        allow: ['log', 'error', 'dir', 'group']
      }
    ],
    'linebreak-style': [1, 'windows'],
    'no-plusplus': [
      1,
      {
        allowForLoopAfterthoughts: true
      }
    ],
    'comma-dangle': [1, 'never'],
    'no-underscore-dangle': [
      1,
      {
        allow: ['__REDUX_DEVTOOLS_EXTENSION__', '_id']
      }
    ],
    'no-param-reassign': [
      1,
      {
        props: false
      }
    ],
    'object-curly-newline': [
      1,
      {
        ObjectPattern: { consistent: true }
      }
    ],
    'operator-linebreak': [
      1,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ],
    'space-before-function-paren': [
      1,
      {
        named: 'ignore'
      }
    ],
    'no-void': 0,
    'no-case-declarations': 0,
    'no-confusing-arrow': 0,
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    indent: 0,

    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx']
      }
    ],
    'react/jsx-curly-newline': 0,
    'react/jsx-wrap-multilines': [1, { prop: 'ignore' }],
    'react/prop-types': 0,

    'jsx-a11y/interactive-supports-focus': 0,

    'import/extensions': [
      1,
      {
        ts: 'never',
        less: 'always'
      }
    ],
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,

    '@typescript-eslint/no-empty-function': [
      1,
      {
        allow: ['arrowFunctions']
      }
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-explicit-any': 0
  }
};
