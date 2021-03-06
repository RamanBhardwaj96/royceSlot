import * as PIXI from "pixi.js";
import { Scene } from "pixi-scenes";
import Loader from "../utils/Loader";
import LoadIndicator from "../objects/LoadIndicator";
import IScene from "./IScene";

export default class Splash extends Scene implements IScene {

    /**
     * Minimal time in ms that the splash should be shown if loading goes too fast.
     */
    private static MIN_LOADING_TIME: number = 1000;

    private loader: PIXI.Loader;
    private loadIndicator: LoadIndicator;
    private currentTime: number;

    public init(): void {

        const assets: { [name: string]: string } = {
            spinBtn: 'assets/buttons/spinBtn.png',
            //mid symbols
            M1: 'assets/images/symbols/Mid/M1.png',
            M2: 'assets/images/symbols/Mid/M2.png',
            M3: 'assets/images/symbols/Mid/M3.png',
            M4: 'assets/images/symbols/Mid/M4.png',
            M5: 'assets/images/symbols/Mid/M5.png',

            // low symbols
            L1: 'assets/images/symbols/Low/L1.png',
            L2: 'assets/images/symbols/Low/L2.png',
            L3: 'assets/images/symbols/Low/L3.png',
            L4: 'assets/images/symbols/Low/L4.png',
            L5: 'assets/images/symbols/Low/L5.png',

            //scatter symbol
            S: 'assets/images/symbols/scatter/S.png',

        };

        // Start loading game assets
        this.loader = Loader.loadBatch('game', assets);
        this.loader.on("progress", this.updateStatus.bind(this, null));
        this.loader.on("complete", this.updateStatus.bind(this, 100));

        this.loadIndicator = new LoadIndicator();
        this.loadIndicator.anchor.set(0.5);
        this.loadIndicator.on("finished", this.checkComplete.bind(this));
        this.addChild(this.loadIndicator);
    }

    public start() {
        this.currentTime = 0;
        this.loadIndicator.reset();
        this.updateStatus();
        this.resize();
    }

    public resize(): void {
        this.loadIndicator.x = this.app.screen.width / 2;
        this.loadIndicator.y = this.app.screen.height / 2
    }

    public update(delta: number): void {
        this.loadIndicator.update(delta);

        // Show the splash for a minimumtime if loading is done
        if (this.currentTime < Splash.MIN_LOADING_TIME) {
            this.currentTime += delta;
            this.checkComplete();
        }
    }

    private updateStatus(progress?: number): void {
        this.loadIndicator.progress = progress || this.loader.progress;
    }

    private checkComplete(): void {
        if (this.currentTime >= Splash.MIN_LOADING_TIME && this.loadIndicator.completed && this.loadIndicator.progress === 100) {
            this.openMenu();
        }
    }

    private openMenu(): void {
        this.scenes.start('menu');
    }
}
