/**
 * @author WMXPY
 * @namespace Candidate_Controller
 * @description Controller
 */

export interface IBarkCandidateController<Snapshot> {

    createSnapshot(): Snapshot;
    createSandboxObject(): Record<string, (...args: any[]) => any>;
}
