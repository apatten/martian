import aliasModuleName from './lib/rollup.alias-module-name.js';

export default {
    entry: './main.js',
    targets: [
        { dest: 'dist/index.js', format: 'cjs' }
    ],
    plugins: [
        aliasModuleName({
            '/mindtouch-http.js/': './node_modules/mindtouch-http.js/'
        })
    ]
};
