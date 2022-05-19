module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        'prettier/prettier': 0,
        'eslint-comments/no-unlimited-disable': 0,
        'eslint-comments/no-unused-disable': 0,
        'object-curly-spacing': ['error', 'always'],
        'indent': ['error', 4],
        'semi': ['error', 'always'],
        'quotes': ['error', 'single'],
    },
};
