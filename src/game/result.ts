/**
 * @author WMXPY
 * @namespace Game
 * @description Result
 */

export enum BARK_GAME_RESULT_SIGNAL {

    FAILED = "FAILED",
    TERMINATED = "TERMINATED",
    ROUND_LIMIT_REACHED = "ROUND_LIMIT_REACHED",
    FINISHED = "FINISHED",
}

export interface IBarkGameResult {

    readonly signal: BARK_GAME_RESULT_SIGNAL;
    readonly round: number;

    readonly reason?: any;
}

export class BarkGameResultBuilder {

    public static fromScratch(): BarkGameResultBuilder {

        return new BarkGameResultBuilder();
    }

    private _signal?: BARK_GAME_RESULT_SIGNAL;
    private _round?: number;

    private _reason?: any;

    public signal(signal: BARK_GAME_RESULT_SIGNAL): this {

        this._signal = signal;
        return this;
    }

    public round(round: number): this {

        this._round = round;
        return this;
    }

    public reason(reason: any): this {

        this._reason = reason;
        return this;
    }

    public build(): IBarkGameResult {

        return {

            signal: this._signal as BARK_GAME_RESULT_SIGNAL,
            round: this._round as number,

            reason: this._reason,
        };
    }
}
