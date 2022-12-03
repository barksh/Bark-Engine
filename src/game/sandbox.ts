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
import { BarkGameController } from "./controller/game";
import { BarkGameSession } from "./session";

export interface ICreateGameSandboxConfig {

    readonly gameController: BarkGameController;
    readonly session: BarkGameSession;
}

export const createGameSandbox = (
    config: ICreateGameSandboxConfig,
): Sandbox => {

    const sandbox: Sandbox = Sandbox.fromAllEvaluators();

    sandbox.use(markedDateMixinFactory.createInjectMixin("Date"));
    sandbox.use(markedJsonMixinFactory.createInjectMixin("Json"));
    sandbox.use(markedObjectMixinFactory.createInjectMixin("Object"));
    sandbox.use(markedParseMixinFactory.createInjectMixin("Parse"));

    const gameControllerMixin: MarkedMixin = config.gameController.createSandboxMixin();

    sandbox.use(gameControllerMixin);

    const sessionMixin: MarkedMixin = config.session.createSandboxMixin();

    sandbox.use(sessionMixin);

    return sandbox;
};
