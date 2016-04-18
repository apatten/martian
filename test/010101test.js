import { createParser } from 'models/modelHelper';
import { pageModel } from 'models/page.model';
describe('new models', () => {
    it('can parse a page model', () => {
        let parsedModel = createParser(pageModel)(Mocks.page);
        console.log(parsedModel);
    });
});
