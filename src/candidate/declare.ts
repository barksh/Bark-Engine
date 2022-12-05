/**
 * @author WMXPY
 * @namespace Candidate
 * @description Declare
 */

export interface IBarkCandidate {

    readonly identifier: string;
    readonly script: string;
}

export type BarkActionListener = (action: any) => void;

export type BarkCandidateInputParameters = Record<string, any>;
