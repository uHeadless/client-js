export default class UHeadlessRestClient {
    token: string;
    cdnUrl: string;
    constructor(token: string, cdnUrl: string);
    private getUrl;
    fetch(options?: any): Promise<any>;
}
