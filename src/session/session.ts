/**
 * @author WMXPY
 * @namespace Session
 * @description Session
 */

import { ISandbox, MarkedMixin } from "@sudoo/marked";
import { BarkGameAdditionalArgument } from "../game/additional-argument";
import { BarkSessionListener, SBarkSessionListenerEmptyValue } from "./declare";

export class BarkSession {

    public static create(): BarkSession {

        return new BarkSession();
    }

    private readonly _memory: Map<string, any>;

    private readonly _listeners: Map<string, BarkSessionListener[]>;

    private constructor() {

        this._memory = new Map<string, any>();

        this._listeners = new Map<string, BarkSessionListener[]>();
    }

    public get(key: string): any {

        return this._memory.get(key);
    }

    public set(key: string, value: any): this {

        const previousValue: any | typeof SBarkSessionListenerEmptyValue =
            this._memory.has(key)
                ? this._memory.get(key)
                : SBarkSessionListenerEmptyValue;

        if (this._listeners.has(key)) {

            const listeners: BarkSessionListener[] =
                this._listeners.get(key) as BarkSessionListener[];

            for (const listener of listeners) {
                listener(previousValue, value);
            }
        }

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
