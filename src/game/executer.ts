/**
 * @author WMXPY
 * @namespace Game
 * @description Game Executer
 */

import { Sandbox } from "@sudoo/marked";
import { ICandidate } from "../candidate/declare";
import { BarkGameController } from "./controller/game";
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

        const gameController: BarkGameController = BarkGameController.fromConfig({
            candidates,
        });

        const gameSandbox: Sandbox = createGameSandbox(gameController);

        await gameSandbox.evaluate(this.game.script);

        return;
    }
}
