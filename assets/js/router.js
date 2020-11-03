import Data from './data.js'

/**
 * This class is responsible for routing the pages
 * it uses a map to cache the static contents of pages.
 */
export default class Router extends Map {
    constructor(app) {
        super();

        this._ = app;
    }

    async _getPathContents(path) {
        const fullPath = `/assets/content${path}.html`;

        const res = await Data.get(fullPath);

        return res.text();
    }

    prepare(path) {
        if (this.has(path)) {
            return this.get(path);
        }

        const fileStream = this._getPathContents(path);
        this.set(path, fileStream);

        return fileStream;
    }

    async navigate(path) {
        const contents = await this.prepare(path);

        this._.content.innerHTML = contents;
    }
}
