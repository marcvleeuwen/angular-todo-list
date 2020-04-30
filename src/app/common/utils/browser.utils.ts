import {Params} from '@angular/router';

export class BrowserUtils {

    /**
     * Returns the angular router path when using hash routes
     * @param {string} url
     * @returns {string}
     */
    public static getHashPath(url: string = window.location.href): string {
        let path: string = '/';
        let start: number = url.indexOf('#');
        if (start !== -1 && start + 1 < url.length) {
            start += 1;
            const end: number = url.indexOf('?', start);
            let length: number = start - url.length;
            if (end !== -1) {
                length = end - start;
            }
            path = url.substr(start, length);
        }
        return path;
    }

    /**
     * Converts querystring information to a javascript map object
     * @returns {[key:string]:string}
     */
    public static queryStringToMap(url: string = window.location.href): Params {
        const questionPos: number = url.indexOf('?');
        if (questionPos !== -1) {
            url = url.substr(questionPos);
        }

        const queryString: { [key: string]: string } = {};
        try {
            // Check for querystring syntax
            // e.g. http://localhost:8080/?policyNumber=385275190
            url.replace(
                new RegExp('[\\?&]([^&=]+)=([^&=]+)', 'g'),
                function (substring: string, ...args: string[]): string {
                    if (typeof args[0] !== 'undefined' &&
                        typeof args[1] !== 'undefined') {
                        const name: string = args[0].replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
                        queryString[name] = decodeURIComponent(args[1].replace(/\+/g, ' '));
                    }
                    return <string>undefined;
                }
            );
        } catch (e) {
            // Ignore
            console.warn(e);
        }

        return queryString;
    }

    public static getQueryStringParam(name: string, url: string = window.location.href): string {
        const map: { [key: string]: string } = this.queryStringToMap(url);
        const val: string = map[name];
        return val ? val : '';
    }
}
