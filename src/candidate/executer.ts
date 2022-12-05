/**
 * @author WMXPY
 * @namespace Candidate
 * @description Executer
 */

import { END_SIGNAL, MarkedResult, Sandbox } from "@sudoo/marked";
import { BarkLog } from "../log/log";
import { BarkCandidateAdditionalArgument } from "./additional-argument";
import { BarkCandidateController, IBarkCandidateSnapshot } from "./controller/candidate";
import { BarkActionListener, BarkCandidateInputParameters, IBarkCandidate } from "./declare";
import { BarkCandidateResultBuilder, BARK_CANDIDATE_RESULT_SIGNAL, IBarkCandidateResult } from "./result";
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

    public async execute(log: BarkLog): Promise<IBarkCandidateResult> {

        const resultBuilder: BarkCandidateResultBuilder = BarkCandidateResultBuilder.fromScratch();

        try {

            const additionalArgument: BarkCandidateAdditionalArgument =
                BarkCandidateAdditionalArgument.create();

            const candidateSandbox: Sandbox = createCandidateSandbox({

                log,
                identifier: this._candidate.identifier,

                additionalArgument,
                candidateController: this._controller,
            });

            const evaluateResult: MarkedResult =
                await candidateSandbox.evaluate(this._candidate.script);


            if (evaluateResult.signal === END_SIGNAL.EXCEPTION) {

                return resultBuilder
                    .signal(BARK_CANDIDATE_RESULT_SIGNAL.EXCEPTION)
                    .reason(evaluateResult.exception)
                    .build();
            }

            if (evaluateResult.signal === END_SIGNAL.TERMINATED) {
                return resultBuilder
                    .signal(BARK_CANDIDATE_RESULT_SIGNAL.TERMINATED)
                    .build();
            }

            return resultBuilder
                .signal(BARK_CANDIDATE_RESULT_SIGNAL.FINISHED)
                .build();
        } catch (error) {

            return resultBuilder
                .signal(BARK_CANDIDATE_RESULT_SIGNAL.FAILED)
                .reason(error)
                .build();
        }
    }

    public createSnapshot(): IBarkCandidateSnapshot {

        return this._controller.createSnapshot();
    }
}
