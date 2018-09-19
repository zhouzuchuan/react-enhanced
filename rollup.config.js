import path from 'path';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

import cssnext from 'postcss-cssnext';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'lib/index.js',
            format: 'es'
        },
        // {
        //     file: path.resolve(__dirname, '../react-enhanced-cli/boilerplates/app/src/react-enhanced.js'),
        //     format: 'es'
        // },
        {
            file: path.resolve(__dirname, '../../mes-admin/src/react-enhanced.js'),
            format: 'es'
        }
    ],
    external: [
        'react',
        'react-dom',
        'redux',
        'api-manage',
        'react-redux',
        'prop-types',
        'react-router-redux',
        'history/createBrowserHistory',
        'redux-devtools-extension',
        'react-loadable',
        'redux-saga',
        'redux-saga/effects',
        'axios',
        'lodash.get',
        'lodash.isempty',
        'lodash.pick'
    ],
    plugins: [
        postcss({
            extensions: ['.css', '.less'],
            plugins: [cssnext()]
        }),
        resolve({
            jsnext: true
        }),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                './node_modules/react/react.js': ['cloneElement', 'createElement', 'PropTypes', 'Children', 'Component']
            }
        }),
        babel({
            exclude: ['node_modules/**']
        })
    ]
};
