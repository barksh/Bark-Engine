/**
 * @author WMXPY
 * @namespace Game_Controller
 * @description Candidates
 */

import { IBarkCandidate } from "../../candidate/declare";
import { BarkCandidateExecuter } from "../../candidate/executer";
import { BarkGameAdditionalArgument } from "../additional-argument";
import { IBarkGameController } from "./controller";

export interface IBarkGameCandidatesSnapshot {

    candidates: IBarkCandidate[];
}

export class BarkGameCandidatesController implements IBarkGameController<IBarkGameCandidatesSnapshot> {

    public static fromCandidates(
        candidates: Iterable<IBarkCandidate>,
    ): BarkGameCandidatesController {

        const candidateExecuters: BarkCandidateExecuter[] = [];

        for (const candidate of candidates) {
            candidateExecuters.push(
                BarkCandidateExecuter.fromCandidate(candidate),
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
                return each.candidate;
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
