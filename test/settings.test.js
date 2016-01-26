import settings from 'lib/settings';
describe('Settings', () => {
    it('can set settings values', () => {
        settings.set('foo', 'bar');
        settings.set('abc', 123);
        settings.set('object', { dog: 'cat' });
        expect(settings.get('foo')).toBe('bar');
        expect(settings.get('abc')).toBe(123);
        expect(settings.get('object')).toEqual({ dog: 'cat' });
        let newSettings = settings.getSettings();
        expect(newSettings.foo).toBe('bar');
        expect(newSettings.abc).toBe(123);
        expect(newSettings.object).toEqual({ dog: 'cat' });
    });
});
