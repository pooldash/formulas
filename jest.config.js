
module.exports = {
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest'],
    },
    moduleNameMapper: {
        '~/*': '<rootDir>/*',
    }
};
