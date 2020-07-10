import babel from 'rollup-plugin-babel'
import jsx from 'acorn-jsx'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'

import pkg from './package.json'

const extensions = ['.js', '.ts', '.tsx']
const exclude = ['./node_modules/**']

const ReactEnhancedVersion = pkg.version

export default [
    {
        input: 'src/index.ts',
        output: {
            dir: 'lib',
            format: 'cjs',
            banner: `
/** @license React-Enhanced ${ReactEnhancedVersion}
 *
 * Copyright (c) ${pkg.author}, ${pkg.description}.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
            `,
        },
        external: ['react', 'react-redux', 'styled-components'],
        acornInjectPlugins: [jsx()],
        plugins: [
            resolve({
                extensions,
                modulesOnly: true,
            }),
            commonjs(),
            typescript({
                exclude,
                jsx: 'preserve',
            }),
            babel({
                exclude,
                extensions,
            }),
            // terser(),
        ],
    },
]
