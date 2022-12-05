/**
 * @author WMXPY
 * @namespace Game
 * @description Sandbox
 */

import { MarkedMixin, Sandbox } from "@sudoo/marked";
import { markedDateMixinFactory } from "@sudoo/marked-mixin-date";
import { markedJsonMixinFactory } from "@sudoo/marked-mixin-json";
import { markedObjectMixinFactory } from "@sudoo/marked-mixin-object";
import { markedParseMixinFactory } from "@sudoo/marked-mixin-parse";
import { BarkLog, BARK_LOG_SCOPE } from "../log/log";
import { BarkSession } from "../session/session";
import { BarkGameAdditionalArgument } from "./additional-argument";
import { BarkGameController } from "./controller/game";

export interface ICreateGameSandboxConfig {

    readonly log: BarkLog;

    readonly additionalArgument: BarkGameAdditionalArgument;

    readonly gameController: BarkGameController;
    readonly session: BarkSession;
}

export const createGameSandbox = (
    config: ICreateGameSandboxConfig,
): Sandbox => {

    const sandbox: Sandbox = Sandbox.fromAllEvaluators();

    sandbox.setAdditionalArgument(config.additionalArgument);

    sandbox.use(markedDateMixinFactory.createInjectMixin("Date"));
    sandbox.use(markedJsonMixinFactory.createInjectMixin("Json"));
    sandbox.use(markedObjectMixinFactory.createInjectMixin("Object"));
    sandbox.use(markedParseMixinFactory.createInjectMixin("Parse"));

    const logMixin: MarkedMixin = config.log.createSandboxMixin(
        BARK_LOG_SCOPE.GAME,
    );

    sandbox.use(logMixin);

    const gameControllerMixin: MarkedMixin = config.gameController.createSandboxMixin();

    sandbox.use(gameControllerMixin);

    const sessionMixin: MarkedMixin = config.session.createSandboxMixin();

    sandbox.use(sessionMixin);

    return sandbox;
};
