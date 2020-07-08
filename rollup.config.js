import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import replace from 'rollup-plugin-replace'
import typescript from '@rollup/plugin-typescript'

import cssnext from 'postcss-cssnext'

export default {
    input: 'src/index.ts',
    output: [
        {
            dir: 'lib',
            format: 'cjs',
        },
    ],
    external: ['react'],
    plugins: [
        typescript({}),
        resolve(),
        commonjs(),
        // postcss({
        //     extensions: ['.css', '.less'],
        //     plugins: [cssnext()],
        // }),
        // resolve({
        //     jsnext: true,
        // }),
        // commonjs({
        //     include: 'node_modules/**',
        //     namedExports: {
        //         './node_modules/react/react.js': [
        //             'cloneElement',
        //             'createElement',
        //             'PropTypes',
        //             'Children',
        //             'Component',
        //         ],
        //     },
        // }),
        // babel({
        //     exclude: ['node_modules/**'],
        // }),
        // uglify(),
        // replace({
        //     __version__: '3.0.0',
        //     REACT_SPINKIT_NO_STYLES: true,
        // }),
    ],
}
