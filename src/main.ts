import * as PIXI from 'pixi.js'
const app = new PIXI.Application();

document.body.addEventListener('load', () => {
  document.body.appendChild(app.view);
})
