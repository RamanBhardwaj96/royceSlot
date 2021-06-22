import gsap from "gsap/all";
import { Scene } from "pixi-scenes";
import { Constants } from "../Constants";
import { GameModel } from "../Model/GameModel";
import { SpinButton } from "../objects/Button";
import { ReelArea } from "../reelArea/ReelArea";
import IScene from "./IScene";

export default class Gameplay extends Scene implements IScene {
    private _spinBtn: SpinButton;
    private _reelArea: ReelArea;
    private _width: number;
    private _height: number;

    /**
     * function will be called on intro continue click
     */
    public init(): void {

        // event specific for outcome setter
        window.addEventListener("keydown", (ev) => {
            GameModel.OutComeSetter(ev.key);
        });

        this._reelArea = new ReelArea();
        this._spinBtn = new SpinButton();

        // spin start from here and on complete of spin
        //show spin button and start win presentation
        this._spinBtn.on("click", () => {
            this._spinBtn.visible = false;
            this._reelArea.spinStart().eventCallback("onComplete", () => {
                this._spinBtn.visible = true;
                this._reelArea.dimDownNoWinReels();
            });
        });

        this._reelArea.pivot.x = this._reelArea.width / 2;
        this._reelArea.pivot.y = this._reelArea.height / 2;
        this._reelArea.addChild(this._spinBtn);

        this.addChild(this._reelArea);

        this._width = this._reelArea.width + Constants.RESIZE_OFFSET_WIDTH;
        this._height = this._reelArea.height + Constants.RESIZE_OFFSET_HEIGHT;

        this.resize();
    }

    /**
     * resize to keep everything in middle of screen
     */
    public resize(): void {
        this._reelArea.x = this.app.screen.width / 2;
        this._reelArea.y = this.app.screen.height / 2;

        const scale: number = Math.min(this.app.screen.width / this._width, this.app.screen.height / this._height, 1)
        this._reelArea.scale.set(scale);

        this._spinBtn.x = ((Constants.SYMBOL_HEIGHT_WIDTH * (Constants.REEL_NUM + 0.2)) + this._spinBtn.width / 2);
        this._spinBtn.y = Constants.SYMBOL_HEIGHT_WIDTH * Constants.SYMBOL_PER_REEL / 2;
    }

}
