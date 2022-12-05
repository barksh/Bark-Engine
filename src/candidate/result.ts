/**
 * @author WMXPY
 * @namespace Candidate
 * @description Result
 */

export enum BARK_CANDIDATE_RESULT_SIGNAL {

    FAILED = "FAILED",
    EXCEPTION = "EXCEPTION",
    TERMINATED = "TERMINATED",
    BAD_REQUEST = "BAD_REQUEST",
    FINISHED = "FINISHED",
}

export interface IBarkCandidateResult {

    readonly signal: BARK_CANDIDATE_RESULT_SIGNAL;
    readonly round: number;

    readonly reason?: any;
}

export class BarkCandidateResultBuilder {

    public static fromScratch(): BarkCandidateResultBuilder {

        return new BarkCandidateResultBuilder();
    }

    private _signal?: BARK_CANDIDATE_RESULT_SIGNAL;
    private _round?: number;

    private _reason?: any;

    public signal(signal: BARK_CANDIDATE_RESULT_SIGNAL): this {

        this._signal = signal;
        return this;
    }

    public round(round: number): this {

        this._round = round;
        return this;
    }

    public reason(reason: any): this {

        this._reason = reason;
        return this;
    }

    public build(): IBarkCandidateResult {

        return {

            signal: this._signal as BARK_CANDIDATE_RESULT_SIGNAL,
            round: this._round as number,

            reason: this._reason,
        };
    }
}
