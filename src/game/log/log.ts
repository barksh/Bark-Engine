/**
 * @author WMXPY
 * @namespace Game_Log
 * @description Log
 */

import { ISandbox, MarkedMixin } from "@sudoo/marked";
import { BarkGameAdditionalArgument } from "../additional-argument";

export enum BARK_GAME_LOG_LEVEL {

    DEBUG = 8,
    VERBOSE = 16,
    INFO = 32,
    WARN = 64,
    ERROR = 128,
}

export interface IBarkGameLogRecord {

    readonly level: BARK_GAME_LOG_LEVEL;
    readonly args: any[];
}

export type BarkGameLogListener = (args: any[]) => void;

export class BarkGameLog {

    public static fromLevel(level: BARK_GAME_LOG_LEVEL): BarkGameLog {

        return new BarkGameLog(level);
    }

    private readonly _level: BARK_GAME_LOG_LEVEL;

    private readonly _logs: IBarkGameLogRecord[];
    private readonly _listeners: BarkGameLogListener[];

    private constructor(level: BARK_GAME_LOG_LEVEL) {

        this._level = level;

        this._logs = [];
        this._listeners = [];
    }

    public addListener(listener: BarkGameLogListener): this {

        this._listeners.push(listener);
        return this;
    }

    public createSandboxMixin(): MarkedMixin {

        return (sandbox: ISandbox) => {

            sandbox.inject('log', {

                debug: (_additionalArgument: BarkGameAdditionalArgument, ...args: any[]) => {
                    return this._log(BARK_GAME_LOG_LEVEL.DEBUG, ...args);
                },
                verbose: (_additionalArgument: BarkGameAdditionalArgument, ...args: any[]) => {
                    return this._log(BARK_GAME_LOG_LEVEL.VERBOSE, ...args);
                },
                info: (_additionalArgument: BarkGameAdditionalArgument, ...args: any[]) => {
                    return this._log(BARK_GAME_LOG_LEVEL.INFO, ...args);
                },
                warn: (_additionalArgument: BarkGameAdditionalArgument, ...args: any[]) => {
                    return this._log(BARK_GAME_LOG_LEVEL.WARN, ...args);
                },
                error: (_additionalArgument: BarkGameAdditionalArgument, ...args: any[]) => {
                    return this._log(BARK_GAME_LOG_LEVEL.ERROR, ...args);
                },
            });
        };
    }

    private _log(level: BARK_GAME_LOG_LEVEL, ...args: any[]): this {

        this._logs.push({
            level,
            args,
        });

        this._listeners.forEach((listener: BarkGameLogListener) => {

            if (this._level <= level) {
                listener(args);
            }
        });

        return this;
    }
}
