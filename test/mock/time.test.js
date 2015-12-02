import time from 'time';
describe('Time tests', () => {
    it('can get the date in various formats', () => {
        expect(time('2015-03-23T18:11:13Z').getDate()).toBe('23 Mar 2015');
        expect(time('2015-03-23T18:11:13Z').getAPIDateTime()).toBe('20150323111113');
        expect(time('2015-03-23T18:11:13Z').getTime()).toBe('11:11');
        expect(time('2015-03-23T18:11:13Z').getDateTime()).toBe('11:11, 23 Mar 2015');
    });
    it('can get a range of days', () => {
        let end = time('2015-04-23T18:11:13Z');
        let range = time('2015-03-23T18:11:13Z').range(end);
        expect(Array.isArray(range)).toBe(true);
        expect(range.length).toBe(32);
    });
    it('can get a range of seconds', () => {
        let end = time('2015-03-23T18:11:16Z');
        let range = time('2015-03-23T18:11:12Z').range(end, 2, 's');
        expect(Array.isArray(range)).toBe(true);
        expect(range.length).toBe(3);
    });
    it('can fail if on an invalid range call', () => {
        expect(() => time('2015-03-23T18:11:13Z').range('2015-04-23T18:11:13Z')).toThrow();
    });
});
