import aliasModuleSpecifiers from 'rollup-plugin-alias-module-specifiers';

export default {
    entry: './main.js',
    targets: [
        { dest: 'dist/index.js', format: 'cjs' }
    ],
    plugins: [
        aliasModuleSpecifiers({
            '/mindtouch-http.js/': './node_modules/mindtouch-http.js/'
        })
    ]
};
