/**
 * @author WMXPY
 * @namespace Session
 * @description Session
 */

import { ISandbox, MarkedMixin } from "@sudoo/marked";
import { BarkGameAdditionalArgument } from "../game/additional-argument";

export class BarkSession {

    public static create(): BarkSession {

        return new BarkSession();
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

                get: (_additionalArgument: BarkGameAdditionalArgument, key: string) => {
                    return this.get(key);
                },
                set: (_additionalArgument: BarkGameAdditionalArgument, key: string, value: any) => {
                    return this.set(key, value);
                },
            });
        };
    }
}
