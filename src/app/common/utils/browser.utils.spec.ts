import {BrowserUtils} from './browser.utils';
import {Params} from '@angular/router';

describe('BrowserUtils', () => {
    it('should extract the angular route path', () => {
        const url: string = 'http://localhost:8080/#/test/path?test=abc';
        const expected: string = '/test/path';

        const result: string = BrowserUtils.getHashPath(url);
        expect(result).toEqual(expected);
    });

    it('should extract the querystring as an object', () => {
        const url: string = 'http://localhost:8080/#/test/path?hello=world&good=bye';
        const expected: Params = {
            hello: 'world',
            good: 'bye'
        };

        const result: Params = BrowserUtils.queryStringToMap(url);
        expect(result).toEqual(expected);
        expect(result.hello).toEqual(expected.hello);
        expect(result.good).toEqual(expected.good);
    });

    it('should extract the querystring value', () => {
        const url: string = 'http://localhost:8080/#/test/path?hello=wold&good=bye';
        const expected: string = 'bye';

        const result: string = BrowserUtils.getQueryStringParam('good', url);
        expect(result).toEqual(expected);
    });

});
