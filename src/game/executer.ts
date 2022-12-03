/**
 * @author WMXPY
 * @namespace Game
 * @description Game Executer
 */

import { Sandbox } from "@sudoo/marked";
import { ICandidate } from "../candidate/declare";
import { IBarkGame } from "./declare";
import { createGameSandbox } from "./sandbox";

export class BarkGameExecuter {

    public static fromGame(game: IBarkGame): BarkGameExecuter {

        return new BarkGameExecuter(game);
    }

    private readonly game: IBarkGame;

    private constructor(game: IBarkGame) {

        this.game = game;
    }

    public async execute(candidates: Iterable<ICandidate>): Promise<void> {

        const gameSandbox: Sandbox = createGameSandbox(candidates);

        await gameSandbox.evaluate(this.game.script);

        return;
    }
}
