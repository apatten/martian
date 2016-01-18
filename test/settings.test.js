import settings from 'lib/settings';
describe('Settings', () => {
    it('can set settings values', () => {
        settings.set('foo', 'bar');
        settings.set('abc', 123);
        settings.set('object', { dog: 'cat' });
        expect(settings.get('foo')).toBe('bar');
        expect(settings.get('abc')).toBe(123);
        expect(settings.get('object')).toEqual({ dog: 'cat' });
        expect(settings.getSettings()).toEqual({
            host: '',
            foo: 'bar',
            abc: 123,
            object: { dog: 'cat' }
        });
    });
});
