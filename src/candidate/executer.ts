/**
 * @author WMXPY
 * @namespace Candidate
 * @description Executer
 */

import { BarkCandidateController, IBarkCandidateSnapshot } from "./controller/candidate";
import { BarkActionListener, BarkCandidateInputParameters, IBarkCandidate } from "./declare";

export interface IBarkCandidateExecuterConfig {

    candidate: IBarkCandidate;

    inputParameters: BarkCandidateInputParameters;
    actionListener: BarkActionListener;
}

export class BarkCandidateExecuter {

    public static fromConfig(config: IBarkCandidateExecuterConfig): BarkCandidateExecuter {

        return new BarkCandidateExecuter(config);
    }

    private readonly _candidate: IBarkCandidate;

    private readonly _controller: BarkCandidateController;

    private constructor(config: IBarkCandidateExecuterConfig) {

        this._candidate = config.candidate;

        this._controller = BarkCandidateController.fromConfig({

            candidate: config.candidate,

            inputParameters: config.inputParameters,
            actionListener: config.actionListener,
        });
    }

    public async execute(): Promise<void> {

        return;
    }

    public get candidate(): IBarkCandidate {
        return this._candidate;
    }

    public createSnapshot(): IBarkCandidateSnapshot {

        return this._controller.createSnapshot();
    }
}
