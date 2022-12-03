/**
 * @author WMXPY
 * @namespace Game
 * @description Sandbox
 */

import { Sandbox } from "@sudoo/marked";
import { ICandidate } from "../candidate/declare";

export const createGameSandbox = (candidates: Iterable<ICandidate>): Sandbox => {

    const sandbox: Sandbox = Sandbox.fromAllEvaluators();

    const candidateList: ICandidate[] = Array.from(candidates);

    sandbox.inject('candidates', candidateList);

    return sandbox;
};
