/* eslint-env jasmine, jest */
jest.unmock('../utility.js');
import { utility } from '../utility.js';

describe('Martian utility', () => {
    it('can escape a string for search queries', () => {
        let unescaped = '1111\\+-&|!(){}[]^"~*?:2222';
        expect(utility.searchEscape(unescaped)).toBe('1111\\\\\\+\\-\\&\\|\\!\\(\\)\\{\\}\\[\\]\\^\\"\\~\\*\\?\\:2222');
    });
    it('can get an appropriately-encoded ID for an API resource', () => {
        expect(() => utility.getResourceId()).toThrow();
        expect(utility.getResourceId(123)).toBe(123);
        expect(utility.getResourceId(123, 'home')).toBe(123);
        expect(utility.getResourceId('dog')).toBe('=dog');
        expect(utility.getResourceId('dog', 'dog')).toBe('dog');
        expect(utility.getResourceId('dog?cat/apple')).toBe('=dog%253Fcat%252Fapple');
    });
    it('can get an appropriately-encoded user token', () => {
        expect(utility.getNormalizedUserActivityToken('user 1')).toBe('=user%25201');
        expect(utility.getNormalizedUserActivityToken(123)).toBe(123);
        expect(utility.getNormalizedUserActivityToken('user:token')).toBe('user:token');
        expect(() => utility.getNormalizedUserActivityToken()).toThrow();
    });
    it('can get an appropriately-encoded filename for file attachment access', () => {
        expect(utility.getFilenameId('foo.png')).toBe('foo.png');
        expect(utility.getFilenameId('foo')).toBe('=foo');
        expect(utility.getFilenameId('dog#cat.gif')).toBe('dog%2523cat.gif');
        expect(() => utility.getFilenameId(123)).toThrow();
    });
    it('can escape HTML', () => {
        expect(utility.escapeHTML()).toBe('');
        expect(utility.escapeHTML('<script type="text/javascript">alert("FOO");</script>')).toBe(
            '&lt;script type=&quot;text/javascript&quot;&gt;alert(&quot;FOO&quot;);&lt;/script&gt;'
        );
        expect(utility.escapeHTML('¢£¥€©®<>"&\'')).toBe('¢£¥€©®&lt;&gt;&quot;&amp;&#39;');
    });
    it('can get a date string in the format expected by the api', () => {
        const date = new Date(1999, 0, 31, 12, 59, 30);
        expect(utility.getApiDateString(date)).toBe('19990131125930');
    });
    describe('clean params test', () => {
        it('can clean params that are null', () => {
            const params = {
                foo: '',
                bar: 'baz'
            };
            const cleanParams = utility.cleanParams(params);
            expect(cleanParams.bar).toBe('baz');
            expect(typeof cleanParams.foo).toBe('undefined');
        });
        it('can return an empty object', () => {
            expect(Object.keys(utility.cleanParams()).length).toBe(0);
        });
    });
});
