import aliasModuleSpecifiers from 'rollup-plugin-alias-module-specifiers';

export default {
    input: './main.js',
    output: [
        { file: 'dist/index.js', format: 'cjs' }
    ],
    plugins: [
        aliasModuleSpecifiers({
            '/mindtouch-http.js/': './node_modules/mindtouch-http.js/'
        })
    ]
};
