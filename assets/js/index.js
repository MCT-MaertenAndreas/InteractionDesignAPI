import HeroAPP from './app.js'

const app = new HeroAPP();
// Assign our variable to window to make it globally accessible/debuggable
window.app = app;

document.addEventListener('DOMContentLoaded', (e) => app.domLookup(e));
