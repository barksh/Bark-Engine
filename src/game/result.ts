/**
 * @author WMXPY
 * @namespace Game
 * @description Result
 */

export enum BARK_GAME_RESULT_SIGNAL {

    ROUND_LIMIT_REACHED = "ROUND_LIMIT_REACHED",
    FINISHED = "FINISHED",
}

export interface IBarkGameResult {

    readonly signal: BARK_GAME_RESULT_SIGNAL;
    readonly round: number;
}

export class BarkGameResultBuilder {

    public static fromScratch(): BarkGameResultBuilder {

        return new BarkGameResultBuilder();
    }

    private _signal: BARK_GAME_RESULT_SIGNAL;
    private _round: number;

    public signal(signal: BARK_GAME_RESULT_SIGNAL): this {

        this._signal = signal;
        return this;
    }

    public round(round: number): this {

        this._round = round;
        return this;
    }

    public build(): IBarkGameResult {

        return {

            signal: this._signal,
            round: this._round,
        };
    }
}
