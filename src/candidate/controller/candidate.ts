/**
 * @author WMXPY
 * @namespace Candidate_Controller
 * @description Candidate
 */

import { BarkActionListener, BarkCandidateInputParameters, IBarkCandidate } from "../declare";
import { BarkCandidateActionController, IBarkCandidateActionSnapshot } from "./action";
import { BarkCandidateInputController, IBarkCandidateInputSnapshot } from "./input";

export interface IBarkCandidateControllerConfig {

    readonly candidate: IBarkCandidate;

    readonly inputParameters: BarkCandidateInputParameters;
    readonly actionListener: BarkActionListener;
}

export interface IBarkCandidateSnapshot {

    readonly identifier: string;

    readonly input: IBarkCandidateInputSnapshot;
    readonly action: IBarkCandidateActionSnapshot;
}

export class BarkCandidateController {

    public static fromConfig(config: IBarkCandidateControllerConfig): BarkCandidateController {

        return new BarkCandidateController(config);
    }

    private readonly _candidate: IBarkCandidate;

    private readonly _inputController: BarkCandidateInputController;
    private readonly _actionController: BarkCandidateActionController;

    private constructor(config: IBarkCandidateControllerConfig) {

        this._candidate = config.candidate;

        this._inputController = BarkCandidateInputController.fromParameters(
            config.inputParameters,
        );
        this._actionController = BarkCandidateActionController.fromListener(
            config.actionListener,
        );
    }

    public createSnapshot(): IBarkCandidateSnapshot {

        return {

            identifier: this._candidate.identifier,

            input: this._inputController.createSnapshot(),
            action: this._actionController.createSnapshot(),
        };
    }
}
