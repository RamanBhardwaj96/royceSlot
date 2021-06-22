import { Constants } from "../Constants";

export class GameModel {

    static cheat: string[][] = [];

    // 7 bet lines for now as per 5*3 reel grid
    public static betLineData: number[][] = GameModel.createBetLineData();

    public static reelGrid: string[][] = GameModel.getReelGrid();

    public static winData: boolean[][] = [];

    public static allWinAmount: number = 0;

    static betLineWinData: winInterface[] = [];

    /**
     * function to genrate renadom symbols grid
     * on init and on spin click too
     * @returns 
     */
    private static getReelGrid(): string[][] {
        const retVal: string[][] = [];
        for (let i: number = 0; i < Constants.REEL_NUM; i++) {
            retVal[i] = [];
            for (let j: number = 0; j < Constants.SYMBOL_PER_REEL; j++) {
                retVal[i].push(this.initRandomSymbol());
            }
        }
        console.log("Response: ReelGrid", retVal);
        return retVal;
    }

    /**
     * this functin will be called on spin start
     * and set desired values to use as a result.
     */
    public static onBet(): void {
        GameModel.reelGrid = this.cheat.length ? this.cheat : this.getReelGrid();
        this.betLineWinData = this.createWinningsData();

        GameModel.winData = GameModel.createReelWinData();
        this.cheat = [];

    }

    /**
     * function return grid of random symbol
     * @returns 
     */
    private static initRandomSymbol(): string {
        const availSymbols: string[] = Constants.AVAILABLE_SYMBOLS;
        const max: number = availSymbols.length - 1,
            min: number = 0;
        const symbolName = availSymbols[Math.floor(Math.random() * (max - min + 1) + min)];
        return symbolName;
    }

    /**
     * possible win lines in tthe game
     * @returns
     */
    private static createBetLineData(): number[][] {
        const betLine: number[][] = [];
        betLine.push(
            // 3 straight lines
            [0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1],
            [2, 2, 2, 2, 2],

            // 2 possible zig zags
            [1, 0, 1, 0, 1],
            [2, 1, 2, 1, 2],

            // 2 possible zig zga's reverse
            [0, 1, 0, 1, 0],
            [1, 2, 1, 2, 1],

        );
        return betLine;
    }

    /**
     * outcome setter to tamper the reel grid
     * to show desire win sequence
     * @param keyCode : from number 0-6 , keys of keyboard
     */
    public static OutComeSetter(keyCode: string): void {
        switch (keyCode) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
                const symbolName: string = Constants.AVAILABLE_SYMBOLS[Math.floor(Math.random() * (3) + 3)];
                const winLineId: number = Number(keyCode);
                this.cheat = this.getReelGrid();
                for (let index = 0; index < this.betLineData[winLineId].length; index++) {
                    this.cheat[index][this.betLineData[winLineId][index]] = symbolName;
                }
                console.log("Response: OutcomeSetter", this.cheat);
                break;


        }
    }

    /**
     * function to create win data base on reel Grid
     * @returns array of winInterface
     */
    public static createWinningsData(): winInterface[] {
        const possibleWinSymbols: string[] = [];
        const betLineWinData: winInterface[] = [];
        for (const iterator of this.reelGrid[0]) {
            possibleWinSymbols.push(iterator);
        }

        for (let i = 0; i < possibleWinSymbols.length; i++) {
            const symToCheck: string = possibleWinSymbols[i];

            for (let j = 0; j < this.betLineData.length; j++) {
                let symCount: number = 0;
                const LineId: number = j;
                for (let k = 0; k < this.betLineData[j].length; k++) {
                    const reelId: number = k;
                    const symId: number = this.betLineData[j][k];
                    if (symToCheck === this.reelGrid[reelId][symId]) {
                        symCount++;
                    }
                    else {
                        break;
                    }
                }
                if (symCount >= 3) {
                    const winData: winInterface = {
                        winAmount: symCount * Constants.AVAILABLE_SYMBOLS_SINGLE_PAYOUT[
                            Constants.AVAILABLE_SYMBOLS.indexOf(symToCheck)
                        ],
                        lineId: j,
                        pattern: this.betLineData[j],
                        symbolName: symToCheck,
                        symCount: symCount
                    }
                    betLineWinData.push(winData);
                }

            }

        }
        console.log("Response: all WIn Data", betLineWinData);
        return betLineWinData;
    }

    /**
     * function to map true/false as size of reel grid, to show win/nowin
     * symbols
     * @returns : array of false/true based on win line pattern
     */
    private static createReelWinData(): boolean[][] {
        const allWindData: winInterface[] = this.betLineWinData;
        const reelWinData: boolean[][] = this.resetWinData();
        for (let i = 0; i < allWindData.length; i++) {
            const symbCount = allWindData[i].symCount;
            const betlinep: number[] = allWindData[i].pattern;

            for (let index = 0; index < symbCount; index++) {
                reelWinData[index][betlinep[index]] = true;
            }
            this.allWinAmount += allWindData[i].winAmount;
        }
        console.log("Response: All Win Amount", this.allWinAmount);
        return reelWinData;
    }

    /**
     * function will map false in all reel grid win positions
     * @returns  reel size array of values false
     */
    private static resetWinData(): boolean[][] {
        this.allWinAmount = 0;
        const retVal: boolean[][] = []
        for (let i: number = 0; i < Constants.REEL_NUM; i++) {
            retVal[i] = [];
            for (let j: number = 0; j < Constants.SYMBOL_PER_REEL; j++) {
                retVal[i][j] = false;
            }
        }

        return retVal
    }

}



interface winInterface {
    winAmount: number;
    lineId: number;
    pattern: number[]
    symbolName: string;
    symCount: number;
}