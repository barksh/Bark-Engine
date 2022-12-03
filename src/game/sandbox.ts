/**
 * @author WMXPY
 * @namespace Game
 * @description Sandbox
 */

import { Sandbox } from "@sudoo/marked";

export const buildGameSandbox = (): Sandbox => {

    const sandbox: Sandbox = Sandbox.fromAllEvaluators();

    return sandbox;
};
