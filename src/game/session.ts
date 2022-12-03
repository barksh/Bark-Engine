/**
 * @author WMXPY
 * @namespace Game
 * @description Session
 */

import { ISandbox, MarkedMixin } from "@sudoo/marked";

export class BarkGameSession {

    public static create(currentRound: number = 0): BarkGameSession {

        return new BarkGameSession(currentRound);
    }

    private readonly _memory: Map<string, any>;

    private _currentRound: number;

    private constructor(currentRound: number) {

        this._memory = new Map<string, any>();

        this._currentRound = currentRound;
    }

    public get currentRound(): number {
        return this._currentRound;
    }

    public nextRound(): this {

        this._currentRound += 1;
        return this;
    }

    public get(key: string): any {

        return this._memory.get(key);
    }

    public set(key: string, value: any): this {

        this._memory.set(key, value);
        return this;
    }

    public createSandboxMixin(): MarkedMixin {

        return (sandbox: ISandbox) => {

            sandbox.inject('session', {

                getRound: () => this.currentRound,
                get: (key: string) => this.get(key),
                set: (key: string, value: any) => this.set(key, value),
            });
        };
    }
}
