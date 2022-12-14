/**
 * @author WMXPY
 * @namespace Log
 * @description Log
 */

import { ISandbox, MarkedMixin } from "@sudoo/marked";
import { BarkGameAdditionalArgument } from "../game/additional-argument";

export enum BARK_LOG_SCOPE {

    GAME = "GAME",
    CANDIDATE = "CANDIDATE",
}

export enum BARK_LOG_LEVEL {

    DEBUG = 8,
    VERBOSE = 16,
    INFO = 32,
    WARN = 64,
    ERROR = 128,
}

export interface IBarkLogRecord {

    readonly scope: BARK_LOG_SCOPE;
    readonly category?: string;

    readonly level: BARK_LOG_LEVEL;
    readonly args: any[];
}

export interface IBarkLogFindRecordCondition {

    readonly scope?: BARK_LOG_SCOPE;
    readonly category?: string;
    readonly level?: BARK_LOG_LEVEL;
}

export type BarkLogListener = (record: IBarkLogRecord) => void;

export class BarkLog {

    public static fromLevel(level: BARK_LOG_LEVEL): BarkLog {

        return new BarkLog(level);
    }

    private readonly _level: BARK_LOG_LEVEL;

    private readonly _logRecords: IBarkLogRecord[];
    private readonly _listeners: BarkLogListener[];

    private constructor(level: BARK_LOG_LEVEL) {

        this._level = level;

        this._logRecords = [];
        this._listeners = [];
    }

    public get records(): IBarkLogRecord[] {
        return this._logRecords;
    }

    public findRecords(condition: IBarkLogFindRecordCondition): IBarkLogRecord[] {

        return this._logRecords.filter((record: IBarkLogRecord) => {

            if (typeof condition.scope !== 'undefined') {
                if (record.scope !== condition.scope) {
                    return false;
                }
            }

            if (typeof condition.level !== 'undefined') {
                if (record.level !== condition.level) {
                    return false;
                }
            }

            if (typeof condition.category !== 'undefined') {
                if (record.category !== condition.category) {
                    return false;
                }
            }

            return true;
        });
    }

    public addListener(listener: BarkLogListener): this {

        this._listeners.push(listener);
        return this;
    }

    public createSandboxMixin(
        scope: BARK_LOG_SCOPE,
        category?: string,
    ): MarkedMixin {

        return (sandbox: ISandbox) => {

            sandbox.inject('log', {

                debug: (_additionalArgument: BarkGameAdditionalArgument, ...args: any[]) => {
                    this._log(BARK_LOG_LEVEL.DEBUG, scope, category, ...args);
                },
                verbose: (_additionalArgument: BarkGameAdditionalArgument, ...args: any[]) => {
                    this._log(BARK_LOG_LEVEL.VERBOSE, scope, category, ...args);
                },
                info: (_additionalArgument: BarkGameAdditionalArgument, ...args: any[]) => {
                    this._log(BARK_LOG_LEVEL.INFO, scope, category, ...args);
                },
                warn: (_additionalArgument: BarkGameAdditionalArgument, ...args: any[]) => {
                    this._log(BARK_LOG_LEVEL.WARN, scope, category, ...args);
                },
                error: (_additionalArgument: BarkGameAdditionalArgument, ...args: any[]) => {
                    this._log(BARK_LOG_LEVEL.ERROR, scope, category, ...args);
                },
            });
        };
    }

    private _log(
        level: BARK_LOG_LEVEL,
        scope: BARK_LOG_SCOPE,
        category?: string,
        ...args: any[]
    ): this {

        const logRecord: IBarkLogRecord = {
            scope,
            category,
            level,
            args,
        };

        this._logRecords.push(logRecord);
        this._listeners.forEach((listener: BarkLogListener) => {

            if (this._level <= level) {
                listener(logRecord);
            }
        });

        return this;
    }
}
