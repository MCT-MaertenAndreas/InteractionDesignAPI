import Hero from './hero.js'
import HeroAPI from './heroapi.js'
import Router from './router.js'

export default class HeroAPP {
    _ = false;
    _page;
    router = new Router(this);

    constructor() {
        this._page = location.hash == '' ? '/hero' : location.hash.split('#')[1];

        this._loadPage(this._page);

        this.router.registerClassForPath('/hero', new Hero());
    }

    async _loadPage(page) {
        await this.router.prepare(page);

        this._ready();
    }

    /**
     * @private
     */
    _ready() {
        if (this._) this.router.navigate(this._page);
        this._ = true;
    }

    domLookup(e) {
        this.content = document.querySelector('.js-content');

        this._ready();
    }
}
