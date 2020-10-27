export default class Data {
    constructor() {

    }

    /**
     * @param {string} url
     * @param {Object} [query={}] An object with the query params to add to GET request
     * @param {Object} [headers={}]
     * @param {Object} [options={}] Custom options to pass to fetch
     */
    static get(url, query = {}, headers = {}, options = {}) {
        let request;
        try {
            request = new URL(url);
        } catch (e) {
            request = new URL(`${window.location.origin}${url}`);
        }

        Object.assign(options, {
            headers,
            method: 'GET'
        });

        request.search = new URLSearchParams(query);

        return fetch(request, options);
    }
}
