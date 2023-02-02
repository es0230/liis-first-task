module.exports = {
  root: '',
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb-typescript',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react',],
  ignorePatterns: ['__oldSrc/**', '/**/*.d.ts', '/*.*'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'global-require': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'no-unused-expressions': 'off',
    'no-underscore-dangle': 'off',
    'func-names': 'off',
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-shadow': 'off',
    'consistent-return': 'off',
    'no-case-declarations': 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'react/no-array-index-key': 'off',
    'no-prototype-builtins': 'off',
    'array-callback-return': 'off',
    'no-use-before-define': 'off',
    'max-len': ["error", { "code": 120 }],
    "react/require-default-props": "off",
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/default-param-last': 'off',
    "@typescript-eslint/no-unused-expressions": 'off',
    '@typescript-eslint/no-shadow': 'off',
    'react/function-component-definition': 'off',
    'react/no-unstable-nested-components': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state',
      ]
    }],
    '@typescript-eslint/no-non-null-assertion': 'off'
  },
};
