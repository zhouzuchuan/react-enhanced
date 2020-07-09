import babel from 'rollup-plugin-babel'
import path from 'path'
import jsx from 'acorn-jsx'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import replace from 'rollup-plugin-replace'
import typescript from '@rollup/plugin-typescript'

import pkg from './package.json'

import cssnext from 'postcss-cssnext'

const extensions = ['.js', '.ts', '.tsx']

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'esm',
        },
    ],
    external: ['react', 'react-redux', 'styled-component', 'react-spinkit'],
    acornInjectPlugins: [jsx()],
    plugins: [
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
        // typescript({
        //     jsx: 'preserve',
        //     module: 'CommonJS',
        //     exclude: ['node_modules/**'],
        // }),
        // commonjs({
        //     extensions,
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
        resolve({
            extensions,
            modulesOnly: true,
        }),
        babel({
            exclude: './node_modules/**',
            extensions,
        }),
        // terser(),
        // replace({
        //     __version__: '3.0.0',
        //     REACT_SPINKIT_NO_STYLES: true,
        // }),
    ],
}
