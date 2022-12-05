/**
 * @author WMXPY
 * @namespace Game_Controller
 * @description Candidates
 */

import { BarkActionListener, BarkCandidateInputParameters, IBarkCandidate } from "../../candidate/declare";
import { BarkCandidateExecuter } from "../../candidate/executer";
import { BarkGameAdditionalArgument } from "../additional-argument";
import { IBarkGameController } from "./controller";

export interface IBarkGameCandidatesSnapshot {

    candidates: string[];
}

export class BarkGameCandidatesController implements IBarkGameController<IBarkGameCandidatesSnapshot> {

    public static fromCandidates(
        candidates: IBarkCandidate[],
    ): BarkGameCandidatesController {

        return new BarkGameCandidatesController(candidates);
    }

    private readonly _indexMap: Map<number, string>;
    private readonly _candidatesMap: Map<string, IBarkCandidate>;

    private constructor(candidates: IBarkCandidate[]) {

        this._indexMap = new Map();
        this._candidatesMap = new Map();

        for (let i = 0; i < candidates.length; i++) {
            this._indexMap.set(i, candidates[i].identifier);
            this._candidatesMap.set(candidates[i].identifier, candidates[i]);
        }
    }

    public async executeByCandidate(
        candidate: IBarkCandidate,
        inputParameters: BarkCandidateInputParameters,
        actionListener: BarkActionListener,
    ): Promise<void> {

        const executer = BarkCandidateExecuter.fromConfig({
            candidate,

            inputParameters,
            actionListener,
        });

        await executer.execute();
        return;
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

            size: () => (_additionalArgument: BarkGameAdditionalArgument) => {
                return this._candidatesMap.size;
            },
        };
    }
}
