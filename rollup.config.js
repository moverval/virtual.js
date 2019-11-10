import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: './src/virtual.ts',
        output: [{
            name: 'Virtual',
            file: 'dist/virtual.js',
            format: 'umd'
        }],
        plugins: [
            typescript()
        ]
    },
    {
        input: './src/virtual.ts',
        output: [{
            name: 'Virtual',
            file: 'dist/virtual.min.js',
            format: 'umd'
        }],
        plugins: [
            typescript({
                tsconfig: 'tsconfig.json'
            }),
            terser({
                output: {
                    comments: false,
                    semicolons: false
                }
            })
        ]
    }
]