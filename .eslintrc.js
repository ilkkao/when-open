module.exports = {
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true
      }
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }]
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    browser: true,
    jest: true
  },
  plugins: ['prettier']
};
