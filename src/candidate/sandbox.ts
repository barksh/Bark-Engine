/**
 * @author WMXPY
 * @namespace Candidate
 * @description Sandbox
 */

import { MarkedMixin, Sandbox } from "@sudoo/marked";
import { markedDateMixinFactory } from "@sudoo/marked-mixin-date";
import { markedJsonMixinFactory } from "@sudoo/marked-mixin-json";
import { markedObjectMixinFactory } from "@sudoo/marked-mixin-object";
import { markedParseMixinFactory } from "@sudoo/marked-mixin-parse";
import { BarkCandidateAdditionalArgument } from "./additional-argument";
import { BarkCandidateController } from "./controller/candidate";

export interface ICreateCandidateSandboxConfig {

    readonly additionalArgument: BarkCandidateAdditionalArgument;

    readonly candidateController: BarkCandidateController;
}

export const createCandidateSandbox = (
    config: ICreateCandidateSandboxConfig,
): Sandbox => {

    const sandbox: Sandbox = Sandbox.fromAllEvaluators();

    sandbox.setAdditionalArgument(config.additionalArgument);

    sandbox.use(markedDateMixinFactory.createInjectMixin("Date"));
    sandbox.use(markedJsonMixinFactory.createInjectMixin("Json"));
    sandbox.use(markedObjectMixinFactory.createInjectMixin("Object"));
    sandbox.use(markedParseMixinFactory.createInjectMixin("Parse"));

    const candidateControllerMixin: MarkedMixin = config.candidateController.createSandboxMixin();

    sandbox.use(candidateControllerMixin);

    return sandbox;
};
