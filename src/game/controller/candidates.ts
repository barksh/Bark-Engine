/**
 * @author WMXPY
 * @namespace Game_Controller
 * @description Candidates
 */

import { BarkActionListener, BarkCandidateInputParameters, IBarkCandidate } from "../../candidate/declare";
import { BarkCandidateExecuter } from "../../candidate/executer";
import { BarkCandidateResultBuilder, BARK_CANDIDATE_RESULT_SIGNAL, IBarkCandidateResult } from "../../candidate/result";
import { BarkLog } from "../../log/log";
import { BarkGameAdditionalArgument } from "../additional-argument";
import { IBarkGameController } from "./controller";

export interface IBarkGameCandidatesSnapshot {

    candidates: string[];
}

export class BarkGameCandidatesController implements IBarkGameController<IBarkGameCandidatesSnapshot> {

    public static fromCandidates(
        candidates: IBarkCandidate[],
        log: BarkLog,
    ): BarkGameCandidatesController {

        return new BarkGameCandidatesController(candidates, log);
    }

    private readonly _log: BarkLog;

    private readonly _indexMap: Map<number, string>;
    private readonly _candidatesMap: Map<string, IBarkCandidate>;

    private constructor(
        candidates: IBarkCandidate[],
        log: BarkLog,
    ) {

        this._log = log;

        this._indexMap = new Map();
        this._candidatesMap = new Map();

        for (let i = 0; i < candidates.length; i++) {
            this._indexMap.set(i, candidates[i].identifier);
            this._candidatesMap.set(candidates[i].identifier, candidates[i]);
        }
    }

    public async executeByIdentifier(
        identifier: string,
        inputParameters: BarkCandidateInputParameters,
        actionListener: BarkActionListener,
    ): Promise<IBarkCandidateResult> {

        if (this._candidatesMap.has(identifier)) {
            const candidate: IBarkCandidate =
                this._candidatesMap.get(identifier) as IBarkCandidate;

            return this.executeByCandidate(candidate, inputParameters, actionListener);
        }

        const resultBuilder: BarkCandidateResultBuilder = BarkCandidateResultBuilder.fromScratch();

        return resultBuilder
            .signal(BARK_CANDIDATE_RESULT_SIGNAL.BAD_REQUEST)
            .reason("Identifier not found")
            .build();
    }

    public async executeByCandidate(
        candidate: IBarkCandidate,
        inputParameters: BarkCandidateInputParameters,
        actionListener: BarkActionListener,
    ): Promise<IBarkCandidateResult> {

        const executer = BarkCandidateExecuter.fromConfig({

            candidate,

            inputParameters,
            actionListener,
        });

        return await executer.execute(this._log);
    }

    public createSnapshot(): IBarkGameCandidatesSnapshot {

        return {
            candidates: [
                ...this._candidatesMap.keys(),
            ],
        };
    }

    public createSandboxObject(): Record<string, any> {

        return {

            getCandidates: (
                _additionalArgument: BarkGameAdditionalArgument,
            ) => {
                return [
                    ...this._candidatesMap.keys(),
                ];
            },
            executeCandidateScript: async (
                _additionalArgument: BarkGameAdditionalArgument,
                identifier: string,
                inputParameters: BarkCandidateInputParameters,
                actionListener: BarkActionListener,
            ) => {
                return await this.executeByIdentifier(
                    identifier,
                    inputParameters,
                    actionListener,
                );
            },
        };
    }
}
