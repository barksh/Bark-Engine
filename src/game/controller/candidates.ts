/**
 * @author WMXPY
 * @namespace Game_Controller
 * @description Candidates
 */

import { ICandidate } from "../../candidate/declare";
import { BarkGameAdditionalArgument } from "../additional-argument";

export class BarkGameCandidatesController {

    public static fromCandidates(
        candidates: Iterable<ICandidate>,
    ): BarkGameCandidatesController {

        return new BarkGameCandidatesController(candidates);
    }

    private readonly _candidates: ICandidate[];

    private constructor(candidates: Iterable<ICandidate>) {

        this._candidates = Array.from(candidates);
    }

    public createObject(): Record<string, any> {

        return {

            size: () => (_additionalArgument: BarkGameAdditionalArgument) => {
                return this._candidates.length;
            },
        };
    }
}
