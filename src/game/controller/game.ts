/**
 * @author WMXPY
 * @namespace Game_Controller
 * @description Game
 */

import { ISandbox, MarkedMixin } from "@sudoo/marked";
import { ICandidate } from "../../candidate/declare";
import { BarkGameCandidatesController } from "./candidates";
import { BarkGameStatusController } from "./status";

export interface IBarkGameControllerConfig {

    readonly candidates: Iterable<ICandidate>;
}

export class BarkGameController {

    public static fromConfig(
        config: IBarkGameControllerConfig,
    ): BarkGameController {

        return new BarkGameController(config);
    }

    private readonly _candidatesController: BarkGameCandidatesController;
    private readonly _statusController: BarkGameStatusController;

    private constructor(config: IBarkGameControllerConfig) {

        this._candidatesController = BarkGameCandidatesController.fromCandidates(
            config.candidates,
        );
        this._statusController = BarkGameStatusController.create();
    }

    public get candidatesController(): BarkGameCandidatesController {
        return this._candidatesController;
    }
    public get statusController(): BarkGameStatusController {
        return this._statusController;
    }

    public createSandboxMixin(): MarkedMixin {

        return (sandbox: ISandbox) => {

            sandbox.inject('game', {

                candidates: this._candidatesController.createObject(),
                status: this._statusController.createObject(),
            });
        };
    }
}
