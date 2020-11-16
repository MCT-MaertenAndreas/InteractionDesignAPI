import HeroAPP from './app.js'

const app = new HeroAPP();
window.app = app;
document.addEventListener('DOMContentLoaded', (e) => app.domLookup(e));
