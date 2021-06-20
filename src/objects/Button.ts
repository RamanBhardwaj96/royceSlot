import * as PIXI from "pixi.js";
import Loader from "../utils/Loader";

export default class Button extends PIXI.Container {

    private background: PIXI.Sprite;
    private text: PIXI.Text;

    constructor(app: PIXI.Application, text: string) {
        super();
        this.interactive = true;
        this.cursor = "pointer";
        // Generate background
        const graphics: PIXI.Graphics = new PIXI.Graphics();
        graphics.beginFill(0xffffff);
        graphics.drawRoundedRect(0, 0, 180, 60, 20);
        graphics.endFill();
        this.background = new PIXI.Sprite(app.renderer.generateTexture(graphics, PIXI.SCALE_MODES.LINEAR, 1));
        this.background.anchor.set(0.5);

        this.text = new PIXI.Text(text, {
            fontSize: 20
        });
        this.text.anchor.set(0.5);

        this.addChild(this.background);
        this.addChild(this.text);
    }
}

export class SpinButton extends PIXI.Container {
    private _btnSprite: PIXI.Sprite;
    constructor() {
        super();
        this.interactive = true;
        this.cursor = "pointer";
        this._btnSprite = new PIXI.Sprite(Loader.getAsset("game", "spinBtn").texture);
        this._btnSprite.anchor.set(0.5);
        this.addChild(this._btnSprite);
    }
}
