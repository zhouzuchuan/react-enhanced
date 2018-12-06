module.exports = {
    env: {
        node: true,
        es6: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        sourceType: 'module',
        allowImportExportEverywhere: false
    },
    parser: 'babel-eslint',
    rules: {
        indent: [0, 4],
        quotes: [2, 'single'],
        'linebreak-style': [2, 'unix'],
        semi: [2, 'never'],
        'no-cond-assign': 2,
        'no-constant-condition': 2,
        'no-dupe-args': 2,
        'no-dupe-keys': 2,
        'no-duplicate-case': 2,
        'no-console': 1,
        'no-debugger': 1,
        'no-var': 1,
        'no-trailing-spaces': 0,
        'eol-last': 0,
        'no-unused-vars': 2,
        'no-underscore-dangle': 0,
        'no-alert': 0,
        'no-lone-blocks': 0,

        // 强制回调错误处理（当第一个参数以 err 开头时）
        'handle-callback-err': ['error', '^err.*$'],
        // 禁用混合的 Requires
        'no-mixed-requires': 'error',
        // 不允许 new require
        'no-new-require': 'error',
        // 当使用 _dirname 和 _filename 时不允许字符串拼接，必须用 path.resolve(__dirname, xx)
        'no-path-concat': 'error',
        // 禁用未声明的变量
        'no-undef': 'error'
    }
};
