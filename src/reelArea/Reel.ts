import Loader from "../utils/Loader";
import { Constants } from "../Constants";
import * as PIXI from "pixi.js";
import gsap from "gsap";
import { GameModel } from "../Model/GameModel";


export class Reel extends PIXI.Container {

    private _symbols: PIXI.Sprite[] = [];
    private _reelId: number;
    constructor(reelId: number) {
        super();
        this._reelId = reelId;
        this.createReel();
    }

    /**
     * function to create init reels
     */
    private createReel(): void {
        for (let i: number = 0; i < Constants.SYMBOL_PER_REEL; i++) {
            const symbol: PIXI.Sprite = new PIXI.Sprite(Loader.getAsset("game", GameModel.reelGrid[this._reelId][i]).texture);
            symbol.y = (Constants.SYMBOL_HEIGHT_WIDTH * i);
            symbol.y += Constants.OFFSET_Y * i;
            this._symbols.push(symbol);
            this.addChild(symbol);
        }
    }

    /**
     * function to update reel symbols on spin click
     */
    public spinReel(): gsap.core.Timeline {
        const tl: gsap.core.Timeline = gsap.timeline();

        for (let i: number = 0; i < this._symbols.length; i++) {
            tl.to(this._symbols[i], { duration: 0.2, alpha: 0 }, 0);
            tl.add(() => {
                this._symbols[i].tint = 0xffffff;
                this._symbols[i].texture = new PIXI.Sprite(Loader.getAsset("game", GameModel.reelGrid[this._reelId][i]).texture).texture;
            });
            tl.to(this._symbols[i], { duration: 0.2, alpha: 1 });
        }
        return tl;
    }

    /**
     * function to dim down no win symbols
     * if win is greater than 0
     */
    public dimDownNoWinSymbol() {
        this._symbols.forEach((symbol: PIXI.Sprite, index: number) => {
            if (!GameModel.winData[this._reelId][index]) {
                symbol.tint = 0x888888;
            }
        });
    }
}