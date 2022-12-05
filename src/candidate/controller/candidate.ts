/**
 * @author WMXPY
 * @namespace Candidate_Controller
 * @description Candidate
 */

import { IBarkCandidate } from "../declare";

export interface IBarkCandidateControllerConfig {

    readonly candidate: IBarkCandidate;
    readonly index: number;
}

export interface IBarkCandidateSnapshot {

    readonly identifier: string;
    readonly index: number;
}

export class BarkCandidateController {

    public static fromConfig(config: IBarkCandidateControllerConfig): BarkCandidateController {

        return new BarkCandidateController(config);
    }

    private readonly _candidate: IBarkCandidate;
    private readonly _index: number;

    private constructor(config: IBarkCandidateControllerConfig) {

        this._candidate = config.candidate;
        this._index = config.index;
    }

    public createSnapshot(): IBarkCandidateSnapshot {

        return {

            identifier: this._candidate.identifier,
            index: this._index,
        };
    }
}
