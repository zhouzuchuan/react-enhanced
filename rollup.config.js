import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

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
        }
    ],
    external: [
        'react',
        'react-dom',
        // 'redux',
        'react-redux',
        'react-router-redux',
        'lodash',
        'redux-saga'
    ],
    plugins: [
        resolve({
            jsnext: true
        }),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                './node_modules/react/react.js': [
                    'cloneElement',
                    'createElement',
                    'PropTypes',
                    'Children',
                    'Component'
                ]
            }
        }),
        babel({
            exclude: ['node_modules/**']
        })
    ]
};
