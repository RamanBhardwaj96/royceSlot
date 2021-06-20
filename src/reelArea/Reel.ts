import Loader from "../utils/Loader";
import { Constants } from "../Constants";
import * as PIXI from "pixi.js";


export class Reel extends PIXI.Container {
    private _symbols: PIXI.Sprite[] = [];
    constructor(reelId: number) {
        super();
        this.createReel();
    }

    private createReel(): void {
        for (let i: number = 0; i < Constants.SYMBOL_PER_REEL; i++) {
            const symbol: PIXI.Sprite = new PIXI.Sprite(Loader.getAsset("game", this.initRandomSymbol()).texture);
            symbol.y = (Constants.SYMBOL_HEIGHT_WIDTH * i);
            symbol.y += Constants.OFFSET_Y * i;
            this._symbols.push(symbol);
            this.addChild(symbol);
        }
    }

    private initRandomSymbol(): string {
        const availSymbols: string[] = Constants.AVAILABLE_SYMBOLS;
        const max: number = availSymbols.length - 1,
            min: number = 0;
        const symbolName = availSymbols[Math.floor(Math.random() * (max - min + 1) + min)];
        return symbolName;
    }
}