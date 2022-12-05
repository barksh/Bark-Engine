/**
 * @author WMXPY
 * @namespace Game_Controller
 * @description Status
 */

import { BarkGameAdditionalArgument } from "../additional-argument";

export enum BARK_GAME_STATUS {

    START = "START",
    FINISH = "FINISH",
}

export class BarkGameStatusController {

    public static create(startingRound: number = 0): BarkGameStatusController {

        return new BarkGameStatusController(startingRound);
    }

    private _status: BARK_GAME_STATUS;
    private _currentRound: number;

    private constructor(startingRound: number) {

        this._status = BARK_GAME_STATUS.START;

        this._currentRound = startingRound;
    }

    public getCurrentRound(): number {
        return this._currentRound;
    }

    public nextRound(): this {

        this._currentRound += 1;
        return this;
    }

    public getStatus(): BARK_GAME_STATUS {
        return this._status;
    }

    public verifyStatus(status: BARK_GAME_STATUS): boolean {

        return this._status === status;
    }

    public setStatus(status: BARK_GAME_STATUS): void {

        this._status = status;
    }

    public isComplete(): boolean {

        return this.verifyStatus(BARK_GAME_STATUS.FINISH);
    }

    public isOnGoing(): boolean {

        return !this.isComplete();
    }

    public createObject(): Record<string, any> {

        return {

            getRound: (_additionalArgument: BarkGameAdditionalArgument) => {
                return this._currentRound;
            },
            getStatus: (_additionalArgument: BarkGameAdditionalArgument) => {
                return this.getStatus();
            },
            finish: (_additionalArgument: BarkGameAdditionalArgument) => {
                return this.setStatus(BARK_GAME_STATUS.FINISH);
            },
        };
    }
}
