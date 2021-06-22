import { Constants } from "../Constants";
import { Reel } from "./Reel";
import * as PIXI from "pixi.js";
import gsap from "gsap";
import { GameModel } from "../Model/GameModel";


export class ReelArea extends PIXI.Container {
    private _reels: Reel[] = [];
    private _winAmount: PIXI.Text;
    constructor() {
        super();
        this.createReelGrid();
        this.createTotalWinAmountText()
    }

    /**
     * function to create reel grid
     */
    private createReelGrid(): void {
        for (let i: number = 0; i < Constants.REEL_NUM; i++) {
            const reel: Reel = new Reel(i);
            this._reels.push(reel);
            reel.position.x = ((Constants.SYMBOL_HEIGHT_WIDTH) * i);
            reel.position.x += Constants.OFFSET_X * i;
            this.addChild(reel);
        }
    }

    /**
     * function to create win Amount text and position it
     * in middle of screen
     */
    private createTotalWinAmountText(): void {
        this._winAmount = new PIXI.Text("0.00", {
            fontWeight: "bold",
            fill: "0xffffff",
            fontSize: 100
        });
        this._winAmount.pivot.set(this._winAmount.width / 2, this._winAmount.height / 2);
        this._winAmount.position.set(this.width / 2, this.height / 2);
        this._winAmount.visible = false;
        this.addChild(this._winAmount);

    }

    /**
     * function to start spin
     */
    public spinStart(): gsap.core.Timeline {
        const tl: gsap.core.Timeline = gsap.timeline({
            onStart: () => {
                GameModel.onBet();
                this._winAmount.visible = false;
            }
        });
        for (let i: number = 0; i < this._reels.length; i++) {
            tl.add(this._reels[i].spinReel());
        }
        return tl;
    }

    /**
     * function to call dim down for each reel
     */
    public dimDownNoWinReels(): void {
        if (GameModel.allWinAmount > 0) {

            this._winAmount.text = GameModel.allWinAmount.toFixed(2).toString();
            this._winAmount.visible = true;
            this._winAmount.pivot.set(this._winAmount.width / 2, this._winAmount.height / 2);

            for (let i: number = 0; i < this._reels.length; i++) {
                this._reels[i].dimDownNoWinSymbol();
            }
        }
    }

}