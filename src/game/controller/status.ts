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

    private readonly _status: BARK_GAME_STATUS;

    private constructor() {

        this._status = BARK_GAME_STATUS.START;
    }

    public createObject(): Record<string, any> {

        return {
            getStatus: () => this._status,
        };
    }
}
