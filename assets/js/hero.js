import { SwitchDelay } from './constants.js'
import HeroAPI from './heroapi.js'

export default class Hero {
    _ = {};
    _paused = false;
    _ready = false;

    constructor() {
        this._selectRandom();
    }

    get id() {
        return this._id;
    }

    async _fetchHero() {
        this.data = await HeroAPI.get(this.id);

        this.ready();
    }

    _selectRandom() {
        this._id = Math.floor(Math.random() * 731);

        this._fetchHero();
    }

    _toggle() {
        if (this._paused) {
            this._.playPauseButton.classList.remove('paused');

            this.timeout = setTimeout(this._selectRandom.bind(this), SwitchDelay);
        }
        else {
            this._.playPauseButton.classList.add('paused');

            clearTimeout(this.timeout);
        }

        this._paused = !this._paused;


    }

    domLookup() {
        this._.playPauseButton = document.querySelector('.js-button__play-pause');
        if (this._.playPauseButton) this._.playPauseButton.addEventListener('click', this._toggle.bind(this));

        this._.name = document.querySelector('.js-hero__name');
        this._.img = document.querySelector('.js-hero__image');

        // Biography
        this._.fullname = document.querySelector('.js-hero__biography-fullname');
        this._.birthplace = document.querySelector('.js-hero__biography-placeofbirth');
        this._.alignment = document.querySelector('.js-hero__biography-alignment');
        this._.alterego = document.querySelector('.js-hero__biography-alterego');
        this._aliases = document.querySelector('.js-hero__biography-aliases');

        // Powerstats
        this._.intelligence = document.querySelector('.js-powerstat__intelligence');
        this._.strength = document.querySelector('.js-powerstat__strength');
        this._.speed = document.querySelector('.js-powerstat__speed');
        this._.durability = document.querySelector('.js-powerstat__durability');
        this._.power = document.querySelector('.js-powerstat__power');
        this._.combat = document.querySelector('.js-powerstat__combat');

        this.ready();
    }

    ready() {
        if (this._ready) {
            this.setHeroContent();
        }

        this._ready = true;
    }

    setHeroContent() {
        if (this.data.response !== "success") {
            alert("Incorrect response from API, stopping script execution.");

            return;
        }

        this._.name.innerHTML = this.data.name;
        this._.img.src = this.data.image.url;

        const bio = this.data.biography;
        // Biography
        this._.fullname.innerHTML = bio["full-name"];
        this._.birthplace.innerHTML = bio["place-of-birth"];
        this._.alignment.innerHTML = bio["alignment"];
        this._.alterego.innerHTML = bio["alter-egos"];
        this._aliases.innerHTML = bio["aliases"].join(', ');

        const stats = this.data.powerstats;
        // Powerstats
        this._.intelligence.value = isNaN(stats.intelligence) ? 0 : stats.intelligence;
        this._.strength.value = isNaN(stats.strength) ? 0 : stats.strength;
        this._.speed.value = isNaN(stats.speed) ? 0 : stats.speed;
        this._.durability.value =  isNaN(stats.durability) ? 0 : stats.durability;
        this._.power.value = isNaN(stats.power) ? 0 : stats.power;
        this._.combat.value = isNaN(stats.combat) ? 0 : stats.combat;

        if (!this._paused) this.timeout = setTimeout(this._selectRandom.bind(this), SwitchDelay);
    }
}
