import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

import cssnext from 'postcss-cssnext';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'cjs/index.js',
            format: 'cjs'
        },
        {
            file: 'es/index.js',
            format: 'es'
        },
        {
            file: 'example/src/react-enhanced.js',
            format: 'es'
        }
    ],
    external: [
        'react',
        'react-dom',
        // 'redux',
        'react-redux',
        'redux-saga',
        'axios'
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
