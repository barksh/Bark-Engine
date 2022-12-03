/**
 * @author WMXPY
 * @namespace Game
 * @description Sandbox
 */

import { Sandbox } from "@sudoo/marked";
import { markedDateMixinFactory } from "@sudoo/marked-mixin-date";
import { markedJsonMixinFactory } from "@sudoo/marked-mixin-json";
import { markedObjectMixinFactory } from "@sudoo/marked-mixin-object";
import { markedParseMixinFactory } from "@sudoo/marked-mixin-parse";
import { ICandidate } from "../candidate/declare";

export const createGameSandbox = (candidates: Iterable<ICandidate>): Sandbox => {

    const sandbox: Sandbox = Sandbox.fromAllEvaluators();

    sandbox.use(markedDateMixinFactory.createInjectMixin("Date"));
    sandbox.use(markedJsonMixinFactory.createInjectMixin("Json"));
    sandbox.use(markedObjectMixinFactory.createInjectMixin("Object"));
    sandbox.use(markedParseMixinFactory.createInjectMixin("Parse"));

    const candidateList: ICandidate[] = Array.from(candidates);

    sandbox.inject('candidates', candidateList);

    return sandbox;
};
