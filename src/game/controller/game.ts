/**
 * @author WMXPY
 * @namespace Game_Controller
 * @description Game
 */

import { ISandbox, MarkedMixin } from "@sudoo/marked";
import { ICandidate } from "../../candidate/declare";
import { BarkUI } from "../../ui/ui";
import { BarkGameCandidatesController } from "./candidates";
import { BarkGameStatusController } from "./status";
import { BarkGameUIController } from "./ui";

export interface IBarkGameControllerConfig {

    readonly startingRound?: number;
    readonly candidates: Iterable<ICandidate>;
    readonly ui: BarkUI;
}

export class BarkGameController {

    public static fromConfig(
        config: IBarkGameControllerConfig,
    ): BarkGameController {

        return new BarkGameController(config);
    }

    private readonly _candidatesController: BarkGameCandidatesController;
    private readonly _statusController: BarkGameStatusController;
    private readonly _uiController: BarkGameUIController;

    private constructor(config: IBarkGameControllerConfig) {

        this._candidatesController = BarkGameCandidatesController.fromCandidates(
            config.candidates,
        );
        this._statusController = BarkGameStatusController.create(config.startingRound);
        this._uiController = BarkGameUIController.fromUI(config.ui);
    }

    public get candidatesController(): BarkGameCandidatesController {
        return this._candidatesController;
    }
    public get statusController(): BarkGameStatusController {
        return this._statusController;
    }
    public get uiController(): BarkGameUIController {
        return this._uiController;
    }

    public createSandboxMixin(): MarkedMixin {

        return (sandbox: ISandbox) => {

            sandbox.inject('game', {

                candidates: this._candidatesController.createObject(),
                status: this._statusController.createObject(),
                ui: this._uiController.createObject(),
            });
        };
    }
}
