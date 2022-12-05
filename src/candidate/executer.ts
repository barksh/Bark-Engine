/**
 * @author WMXPY
 * @namespace Candidate
 * @description Executer
 */

import { IBarkCandidate } from "./declare";

export class BarkCandidateExecuter {

    public static fromCandidate(candidate: IBarkCandidate): BarkCandidateExecuter {

        return new BarkCandidateExecuter(candidate);
    }

    private readonly _candidate: IBarkCandidate;

    private constructor(
        candidate: IBarkCandidate,
    ) {

        this._candidate = candidate;
    }

    public get candidate(): IBarkCandidate {
        return this._candidate;
    }
}
