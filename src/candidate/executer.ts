/**
 * @author WMXPY
 * @namespace Candidate
 * @description Executer
 */

import { MarkedResult, Sandbox } from "@sudoo/marked";
import { BarkCandidateAdditionalArgument } from "./additional-argument";
import { BarkCandidateController, IBarkCandidateSnapshot } from "./controller/candidate";
import { BarkActionListener, BarkCandidateInputParameters, IBarkCandidate } from "./declare";
import { createCandidateSandbox } from "./sandbox";

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

    public get candidate(): IBarkCandidate {
        return this._candidate;
    }

    public async execute(): Promise<MarkedResult> {

        const additionalArgument: BarkCandidateAdditionalArgument =
            BarkCandidateAdditionalArgument.create();

        const candidateSandbox: Sandbox = createCandidateSandbox({

            additionalArgument,
            candidateController: this._controller,
        });

        const evaluateResult: MarkedResult = await candidateSandbox.evaluate(this._candidate.script);

        return evaluateResult;
    }

    public createSnapshot(): IBarkCandidateSnapshot {

        return this._controller.createSnapshot();
    }
}
