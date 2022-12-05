/**
 * @author WMXPY
 * @namespace Candidate_Controller
 * @description Action
 */

import { BarkActionListener } from "../declare";
import { IBarkCandidateController } from "./controller";

export interface IBarkCandidateActionSnapshot {

    actionHistory: any[];
}

export class BarkCandidateActionController implements IBarkCandidateController<IBarkCandidateActionSnapshot> {

    public static fromListener(
        listener: BarkActionListener,
    ): BarkCandidateActionController {

        return new BarkCandidateActionController(listener);
    }

    private readonly _actionHistory: any[];

    private readonly _listener: BarkActionListener;

    private constructor(listener: BarkActionListener) {

        this._actionHistory = [];

        this._listener = listener;
    }

    public createSnapshot(): IBarkCandidateActionSnapshot {

        return {

            actionHistory: this._actionHistory,
        };
    }

    public createSandboxObject(): Record<string, any> {

        return {

            takeAction: (action: any) => {
                this._takeAction(action);
            },
        };
    }

    private _takeAction(action: any): this {

        this._actionHistory.push(action);

        if (typeof this._listener === 'function') {
            this._listener(action);
        }
        return this;
    }
}
