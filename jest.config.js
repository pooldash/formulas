module.exports = {
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest'],
    },
    moduleNameMapper: {
        '~/(.*)': '<rootDir>/$1',
    },
    roots: ['./tests', './']
};
