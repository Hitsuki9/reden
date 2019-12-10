module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint-config-airbnb',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'import'],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  rules: {
    'no-console': [1, {
      allow: ['log', 'error']
    }],
    'linebreak-style': [1, 'windows'],
    'no-plusplus': [1, {
      'allowForLoopAfterthoughts': true
    }],
    'comma-dangle': [1, 'never'],
    'space-before-function-paren': [1, 'always'],
    'no-underscore-dangle': [1, {
      allow: ['__REDUX_DEVTOOLS_EXTENSION__', '_use', '_on', '_id']
    }],
    'no-param-reassign': [1, {
      props: false
    }],
    'no-confusing-arrow': [1, {
      allowParens: true
    }],
    'no-case-declarations': 0,
    'react/jsx-filename-extension': [1, {
      extensions: ['.tsx']
    }],
    'jsx-a11y/interactive-supports-focus': 0,
    'import/extensions': [1, {
      extensions: ['.js', '.ts']
    }],
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-empty-function': [1, {
      allow: ['arrowFunctions']
    }],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-explicit-any': 0
  }
}
