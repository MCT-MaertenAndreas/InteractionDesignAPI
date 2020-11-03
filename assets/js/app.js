import HeroAPI from './heroapi.js'
import Router from './router.js'

export default class HeroAPP {
    _ = false;
    router = new Router(this);

    constructor() {
        this._loadLanding();
    }

    /**
     * @private
     * Will tell the router to prepare our landing route and if it's done say that we're ready
     */
    async _loadLanding() {
        await this.router.prepare('/landing');

        this._ready();
    }

    /**
     * @private
     */
    _ready() {
        if (this._) this.router.navigate('/landing');
        this._ = true;
    }

    domLookup(e) {
        this.content = document.querySelector('.js-content');

        this._ready();
    }
}
