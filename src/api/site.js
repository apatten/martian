import Plug from 'lib/plug';
let sitePlug = new Plug().at('@api', 'deki', 'site');
export default class Site {
    static getResourceString(options) {
        if(!('key' in options)) {
            return Promise.reject('No resource key was supplied');
        }
        var locPlug = sitePlug.at('localization', options.key);
        if('lang' in options) {
            locPlug = locPlug.withParam('lang', options.lang);
        }
        return locPlug.get();
    }
}
