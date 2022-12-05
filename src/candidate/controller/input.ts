/**
 * @author WMXPY
 * @namespace Candidate_Controller
 * @description Input
 */

import { BarkCandidateInputParameters } from "../declare";
import { IBarkCandidateController } from "./controller";

export interface IBarkCandidateInputSnapshot {

    parameters: BarkCandidateInputParameters;
}

export class BarkCandidateInputController implements IBarkCandidateController<IBarkCandidateInputSnapshot> {

    public static fromParameters(parameters: BarkCandidateInputParameters): BarkCandidateInputController {

        return new BarkCandidateInputController(parameters);
    }

    private readonly _parameters: BarkCandidateInputParameters;

    private constructor(parameters: BarkCandidateInputParameters) {

        this._parameters = parameters;
    }

    public createSnapshot(): IBarkCandidateInputSnapshot {

        return {
            parameters: this._parameters,
        };
    }

    public createSandboxObject(): Record<string, any> {

        return this._parameters;
    }
}
