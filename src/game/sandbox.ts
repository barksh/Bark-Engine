/**
 * @author WMXPY
 * @namespace Game
 * @description Sandbox
 */

import { Sandbox } from "@sudoo/marked";
import { ICandidate } from "../candidate/declare";

export const createGameSandbox = (candidates: Iterable<ICandidate>): Sandbox => {

    const sandbox: Sandbox = Sandbox.fromAllEvaluators();

    return sandbox;
};
