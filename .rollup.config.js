export default {
    entry: './main.js',
    format: 'cjs',
    dest: 'dist/index.js',
    external: [ 'mindtouch-http.js/plug.js', 'mindtouch-http.js/progressPlug.js', 'mindtouch-http.js/uri.js', 'crypto' ]
};