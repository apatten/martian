import {stringUtility} from 'lib/stringUtility';
describe('string utility tests', () => {
    it('can check if a string is blank', () => {
        expect(stringUtility.isBlank()).toBe(true);
        expect(stringUtility.isBlank('')).toBe(true);
        expect(stringUtility.isBlank('asdf')).toBe(false);
    });
    it('can make a string', () => {
        expect(stringUtility.makeString()).toBe('');
        expect(stringUtility.makeString('abc')).toBe('abc');
        expect(stringUtility.makeString([])).toBe('');
        expect(stringUtility.makeString({})).toBe('[object Object]');
    });
    it('can trim the left of a string', () => {
        expect(stringUtility.leftTrim()).toBe('');
        expect(stringUtility.leftTrim('   abc')).toBe('abc');
        expect(stringUtility.leftTrim('\tabc')).toBe('abc');
        expect(stringUtility.leftTrim('//abc', '/')).toBe('abc');
    });
    it('can separate a string to the left', () => {
        expect(stringUtility.stringLeft('foo/bar', '/')).toBe('foo');
        expect(stringUtility.stringLeft('foo bar', ' ')).toBe('foo');
        expect(stringUtility.stringLeft('foo/bar', 'o/')).toBe('fo');
        expect(stringUtility.stringLeft('foo', '/')).toBe('foo');
        expect(stringUtility.stringLeft('/foo', '/')).toBe('');
        expect(stringUtility.stringLeft('foo')).toBe('foo');
        expect(stringUtility.stringLeft('foo', '*')).toBe('foo');
    });
    it('can separate a string to the right', () => {
        expect(stringUtility.stringRight('foo/bar', '/')).toBe('bar');
        expect(stringUtility.stringRight('foo bar', ' ')).toBe('bar');
        expect(stringUtility.stringRight('foo/bar', '/b')).toBe('ar');
        expect(stringUtility.stringRight('foo', '/')).toBe('foo');
        expect(stringUtility.stringRight('foo')).toBe('foo');
        expect(stringUtility.stringRight('foo/', '/')).toBe('');
    });
    it('can split a string into words', () => {
        expect(stringUtility.words('foo   bar')).toEqual([ 'foo', 'bar' ]);
        expect(stringUtility.words('foo/bar', '/')).toEqual([ 'foo', 'bar' ]);
        expect(stringUtility.words('foo/bar', '9')).toEqual([ 'foo/bar' ]);
    });
    it('can check if a string starts with a pattern', () => {
        expect(stringUtility.startsWith('foobar', 'foo')).toBe(true);
        expect(stringUtility.startsWith('foobar', 'oo')).toBe(false);
    });
});
