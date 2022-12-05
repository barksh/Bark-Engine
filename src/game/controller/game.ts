/**
 * @author WMXPY
 * @namespace Game_Controller
 * @description Game
 */

import { ISandbox, MarkedMixin } from "@sudoo/marked";
import { IBarkCandidate } from "../../candidate/declare";
import { BarkGameCandidatesController, IBarkGameCandidatesSnapshot } from "./candidates";
import { BarkGameStatusController, IBarkGameStatusSnapshot } from "./status";

export interface IBarkGameControllerConfig {

    readonly startingRound?: number;
    readonly candidates: Iterable<IBarkCandidate>;
}

export interface IBarkGameSnapshot {

    candidates: IBarkGameCandidatesSnapshot;
    status: IBarkGameStatusSnapshot;
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
        this._statusController = BarkGameStatusController.create(config.startingRound);
    }

    public get candidatesController(): BarkGameCandidatesController {
        return this._candidatesController;
    }
    public get statusController(): BarkGameStatusController {
        return this._statusController;
    }

    public createSnapshot(): IBarkGameSnapshot {

        return {
            candidates: this._candidatesController.createSnapshot(),
            status: this._statusController.createSnapshot(),
        };
    }

    public createSandboxMixin(): MarkedMixin {

        return (sandbox: ISandbox) => {

            sandbox.inject('game', {

                candidates: this._candidatesController.createSandboxObject(),
                status: this._statusController.createSandboxObject(),
            });
        };
    }
}
