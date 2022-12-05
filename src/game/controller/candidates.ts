/**
 * @author WMXPY
 * @namespace Game_Controller
 * @description Candidates
 */

import { ICandidate } from "../../candidate/declare";
import { BarkGameAdditionalArgument } from "../additional-argument";
import { IBarkGameController } from "./controller";

export interface IBarkGameCandidatesSnapshot {

    candidates: ICandidate[];
}

export class BarkGameCandidatesController implements IBarkGameController<IBarkGameCandidatesSnapshot> {

    public static fromCandidates(
        candidates: Iterable<ICandidate>,
    ): BarkGameCandidatesController {

        return new BarkGameCandidatesController(candidates);
    }

    private readonly _candidates: ICandidate[];

    private constructor(candidates: Iterable<ICandidate>) {

        this._candidates = Array.from(candidates);
    }

    public createSnapshot(): IBarkGameCandidatesSnapshot {

        return {
            candidates: this._candidates,
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
