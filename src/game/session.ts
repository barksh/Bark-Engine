/**
 * @author WMXPY
 * @namespace Game
 * @description Session
 */

import { ISandbox, MarkedMixin } from "@sudoo/marked";

export class BarkGameSession {

    public static create(): BarkGameSession {

        return new BarkGameSession();
    }

    private readonly _memory: Map<string, any>;

    private constructor() {

        this._memory = new Map<string, any>();
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

                get: (key: string) => this.get(key),
                set: (key: string, value: any) => this.set(key, value),
            });
        };
    }
}
