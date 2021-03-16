"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UHeadlessClient {
    constructor(token, cdnUrl) {
        this.token = token;
        this.cdnUrl = cdnUrl;
    }
    getUrl(options) {
        const url = new URL(`${this.cdnUrl}/api`);
        url.searchParams.set('token', this.token);
        url.searchParams.set('depth', '6');
        url.searchParams.set('lang', 'en-us');
        for (const key in options) {
            url.searchParams.set(key, options[key]);
        }
        return url;
    }
    fetch(options = {}) {
        const url = this.getUrl(options);
        return fetch(url.toString(), {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        }).then(async (res) => {
            if (res.status > 299 || res.status < 200) {
                throw new Error(await res.text());
            }
            return res.json();
        });
    }
}
exports.default = UHeadlessClient;
//# sourceMappingURL=index.js.map