import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import { uglify } from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'

import cssnext from 'postcss-cssnext'

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'lib/index.js',
            format: 'cjs',
        },
    ],
    external: [
        'react',
        'react-dom',
        'redux',
        'api-manage',
        'react-redux',
        'prop-types',
        'react-router-redux',
        'connected-react-router',
        'history/createBrowserHistory',
        'history/createHashHistory',
        'redux-devtools-extension',
        'react-loadable',
        'model-redux',
        'model-redux/lib/effects/epics',
        'model-redux/lib/effects/sagas',
        'redux-saga',
        'react-spinkit',
        'redux-observable',
        'rxjs',
        'redux-saga/effects',
        'axios',
        'lodash.get',
        'lodash.isempty',
        'lodash.pick',
        'lodash.isequal',
        'classnames',
        'babel-regenerator-runtime',
        'redux-devtools-extension',
        'rxjs/operators',
    ],
    plugins: [
        postcss({
            extensions: ['.css', '.less'],
            plugins: [cssnext()],
        }),
        resolve({
            jsnext: true,
        }),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                './node_modules/react/react.js': [
                    'cloneElement',
                    'createElement',
                    'PropTypes',
                    'Children',
                    'Component',
                ],
            },
        }),
        babel({
            exclude: ['node_modules/**'],
        }),
        uglify(),
        replace({
            REACT_SPINKIT_NO_STYLES: true,
        }),
    ],
}
