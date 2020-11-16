import Hero from './hero.js'
import HeroAPI from './heroapi.js'
import Router from './router.js'

export default class HeroAPP {
    _ = false;
    router = new Router(this);

    constructor() {
        this._loadLanding();

        this.router.registerClassForPath('/hero', new Hero());
    }

    async _loadLanding() {
        await this.router.prepare('/hero');

        this._ready();
    }

    /**
     * @private
     */
    _ready() {
        if (this._) this.router.navigate('/hero');
        this._ = true;
    }

    domLookup(e) {
        this.content = document.querySelector('.js-content');

        this._ready();
    }
}
