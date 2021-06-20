import { Constants } from "../Constants";
import { Reel } from "./Reel";
import { IScene, Scene } from "pixi-scenes";

export class ReelArea extends Scene implements IScene {
    private _reels: Reel[] = [];

    constructor() {
        super();
        this.createReelGrid();
    }

    private createReelGrid(): void {
        for (let i: number = 0; i < Constants.REEL_NUM; i++) {
            const reel: Reel = new Reel(i);
            this._reels.push(reel);
            reel.position.x = ((Constants.SYMBOL_HEIGHT_WIDTH) * i);
            reel.position.x += Constants.OFFSET_X * i;
            this.addChild(reel);
        }
    }

}