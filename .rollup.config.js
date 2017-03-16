import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    entry: './main.js',
    format: 'cjs',
    dest: 'dist/index.js',
    plugins: [ nodeResolve() ]
};