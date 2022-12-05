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
import { BarkLog, BARK_LOG_SCOPE } from "../log/log";
import { BarkCandidateAdditionalArgument } from "./additional-argument";
import { BarkCandidateController } from "./controller/candidate";

export interface ICreateCandidateSandboxConfig {

    readonly log: BarkLog;
    readonly identifier: string;

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

    const logMixin: MarkedMixin = config.log.createSandboxMixin(
        BARK_LOG_SCOPE.CANDIDATE,
        config.identifier,
    );

    sandbox.use(logMixin);

    const candidateControllerMixin: MarkedMixin = config.candidateController.createSandboxMixin();

    sandbox.use(candidateControllerMixin);

    return sandbox;
};
