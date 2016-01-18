import utility from 'lib/utility';
describe('Martian utility', () => {
    it('can escape a string for search queries', () => {
        let unescaped = '1111\\+-&|!(){}[]^"~*?:2222';
        expect(utility.searchEscape(unescaped)).toBe('1111\\\\\\+\\-\\&\\|\\!\\(\\)\\{\\}\\[\\]\\^\\"\\~\\*\\?\\:2222');
    });
    it('can get an appropriately-encoded ID for an API resource', () => {
        expect(utility.getResourceId(123)).toBe(123);
        expect(utility.getResourceId(123, 'home')).toBe(123);
        expect(utility.getResourceId('dog')).toBe('=dog');
        expect(utility.getResourceId('dog', 'dog')).toBe('dog');
        expect(utility.getResourceId('dog?cat/apple')).toBe('=dog%253Fcat%252Fapple');
    });
});
