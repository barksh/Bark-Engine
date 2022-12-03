/**
 * @author WMXPY
 * @namespace Game_Controller
 * @description Status
 */

export enum BARK_GAME_STATUS {

    START = "START",
    FINISH = "FINISH",
}

export class BarkGameStatusController {

    public static create(): BarkGameStatusController {

        return new BarkGameStatusController();
    }

    private _status: BARK_GAME_STATUS;

    private constructor() {

        this._status = BARK_GAME_STATUS.START;
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

            getStatus: () => this.getStatus(),
            finish: () => this.setStatus(BARK_GAME_STATUS.FINISH),
        };
    }
}
