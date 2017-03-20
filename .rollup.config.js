import resolve from 'rollup-plugin-node-resolve';

export default {
    entry: './main.js',
    targets: [
        { dest: 'dist/index.js', format: 'cjs' }
    ],
    plugins: [ resolve() ],
    external: [ 'crypto' ]
};