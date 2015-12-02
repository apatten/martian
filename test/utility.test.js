import utility from 'lib/utility';
import settings from 'settings';
import Plug from 'plug';
describe('Martian utility', () => {
    it('can get a Plug object with a specific host', () => {
        settings.set('host', 'www.example.net');
        let plug = new Plug();
        let hostPlug = utility.getPlugWithHost(plug);
        expect(hostPlug.getUrl()).toBe('www.example.net');
    });
});
