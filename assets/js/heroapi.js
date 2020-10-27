import Data from './data.js'

// This is a school assignment, please do not abuse
const AccessToken = '2800070140250324';
export const BaseURL = 'https://superheroapi.com/api/';

/**
 * {@link https://superheroapi.com/#api-references}
 */
export default class HeroAPI {
    constructor() {}

    /**
     * Queries the hero api for the requested characterId and path
     * @private
     * @param {number} characterId One of the supported character ID's from the API, ranges from (1 to 731)
     * @param {string} path A valid path from the api
     * @returns {Promise<Object>}
     */
    static async _query(characterId, path = '') {
        if (characterId < 1 || characterId > 731) {
            throw new Error('The given character ID is outside of the supported range, taken an ID from between 1 and 731.');

            return;
        }

        const res = await Data.get(BaseURL + AccessToken + '/' + characterId + path);

        return res.json();
    }

    /**
     * {@link https://superheroapi.com/#appearance}
     * @param {number} characterId
     * @returns {Promise<Object>}
     */
    static appearance(characterId) {
        return HeroAPI._query(characterId, '/appearance');
    }

    /**
     * {@link https://superheroapi.com/#biography}
     * @param {number} characterId
     * @returns {Promise<Object>}
     */
    static biography(characterId) {
        return HeroAPI._query(characterId, '/biography');
    }

    /**
     * {@link https://superheroapi.com/#connections}
     * @param {number} characterId
     * @returns {Promise<Object>}
     */
    static connections(characterId) {
        return HeroAPI._query(characterId, '/connections');
    }

    /**
     * Gets all the statistics/info from the given characterId
     * {@link https://superheroapi.com/#id}
     * @param {number} characterId
     * @returns {Promise<Object>}
     */
    static get(characterId) {
        return HeroAPI._query(characterId);
    }

    /**
     * {@link https://superheroapi.com/#image}
     * @param {number} characterId
     * @returns {Promise<Object>}
     */
    static image(characterId) {
        return HeroAPI._query(characterId, '/image');
    }

    /**
     * {@link https://superheroapi.com/#powerstats}
     * @param {number} characterId
     * @returns {Promise<Object>}
     */
    static powerstats(characterId) {
        return HeroAPI._query(characterId, '/powerstats');
    }

    /**
     * Returns an array of matching characters, structure of the object is the same as HeropAPI#get
     * {@link https://superheroapi.com/#name}
     * @param {string} name
     * @returns {Promise<Object[]>}
     */
    static async search(name) {
        const res = await Data.get(BaseURL + AccessToken + '/search/' + name);
        return res.json();
    }

    /**
     * {@link https://superheroapi.com/#work}
     * @param {number} characterId
     * @returns {Promise<Object>}
     */
    static work(characterId) {
        return HeroAPI._query(characterId, '/work');
    }
}
