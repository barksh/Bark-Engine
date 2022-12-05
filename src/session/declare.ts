/**
 * @author WMXPY
 * @namespace Session
 * @description Declare
 */

export const SBarkSessionListenerEmptyValue = Symbol("bark-session-listener-empty-value");

export type BarkSessionListener<T = any> = (
    previousValue: T | typeof SBarkSessionListenerEmptyValue,
    newValue: T,
) => void | Promise<void>;
