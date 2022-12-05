/**
 * @author WMXPY
 * @namespace Candidate
 * @description Executer
 */

import { BarkCandidateController, IBarkCandidateSnapshot } from "./controller/candidate";
import { IBarkCandidate } from "./declare";

export class BarkCandidateExecuter {

    public static fromCandidate(candidate: IBarkCandidate, index: number): BarkCandidateExecuter {

        return new BarkCandidateExecuter(candidate, index);
    }

    private readonly _candidate: IBarkCandidate;
    private readonly _index: number;

    private readonly _controller: BarkCandidateController;

    private constructor(
        candidate: IBarkCandidate,
        index: number,
    ) {

        this._candidate = candidate;
        this._index = index;

        this._controller = BarkCandidateController.fromConfig({
            candidate,
            index,
        });
    }

    public get candidate(): IBarkCandidate {
        return this._candidate;
    }

    public createSnapshot(): IBarkCandidateSnapshot {

        return this._controller.createSnapshot();
    }
}
