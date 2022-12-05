/**
 * @author WMXPY
 * @namespace Game_Controller
 * @description Candidates
 */

import { IBarkCandidateSnapshot } from "../../candidate/controller/candidate";
import { IBarkCandidate } from "../../candidate/declare";
import { BarkCandidateExecuter } from "../../candidate/executer";
import { BarkGameAdditionalArgument } from "../additional-argument";
import { IBarkGameController } from "./controller";

export interface IBarkGameCandidatesSnapshot {

    candidates: IBarkCandidateSnapshot[];
}

export class BarkGameCandidatesController implements IBarkGameController<IBarkGameCandidatesSnapshot> {

    public static fromCandidates(
        candidates: IBarkCandidate[],
    ): BarkGameCandidatesController {

        const candidateExecuters: BarkCandidateExecuter[] = [];

        for (let i = 0; i < candidates.length; i++) {
            candidateExecuters.push(
                BarkCandidateExecuter.fromCandidate(candidates[i], i),
            );
        }
        return new BarkGameCandidatesController(candidateExecuters);
    }

    private readonly _candidates: BarkCandidateExecuter[];

    private constructor(candidates: BarkCandidateExecuter[]) {

        this._candidates = candidates;
    }

    public createSnapshot(): IBarkGameCandidatesSnapshot {

        return {
            candidates: this._candidates.map((each) => {
                return each.createSnapshot();
            }),
        };
    }

    public createSandboxObject(): Record<string, any> {

        return {

            size: () => (_additionalArgument: BarkGameAdditionalArgument) => {
                return this._candidates.length;
            },
        };
    }
}
