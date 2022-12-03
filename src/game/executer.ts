/**
 * @author WMXPY
 * @namespace Game
 * @description Game Executer
 */

import { Sandbox } from "@sudoo/marked";
import { ICandidate } from "../candidate/declare";
import { BarkUI } from "../ui/ui";
import { BarkGameController } from "./controller/game";
import { IBarkGame } from "./declare";
import { BarkGameResultBuilder, BARK_GAME_RESULT_SIGNAL, IBarkGameResult } from "./result";
import { createGameSandbox } from "./sandbox";
import { BarkGameSession } from "./session";

export interface IBarkGameExecuterConfig {

    readonly roundLimit: number;
}

export class BarkGameExecuter {

    public static fromGame(
        game: IBarkGame,
        ui: BarkUI,
        config: Partial<IBarkGameExecuterConfig> = {},
    ): BarkGameExecuter {

        const fixedConfig: IBarkGameExecuterConfig = {
            roundLimit: 100,
            ...config,
        };

        return new BarkGameExecuter(game, ui, fixedConfig);
    }

    private readonly game: IBarkGame;
    private readonly ui: BarkUI;
    private readonly config: IBarkGameExecuterConfig;

    private constructor(
        game: IBarkGame,
        ui: BarkUI,
        config: IBarkGameExecuterConfig,
    ) {

        this.game = game;
        this.ui = ui;
        this.config = config;
    }

    public async execute(candidates: Iterable<ICandidate>): Promise<IBarkGameResult> {

        const gameController: BarkGameController = BarkGameController.fromConfig({
            candidates,
            ui: this.ui,
        });

        const session: BarkGameSession = BarkGameSession.create();

        const gameSandbox: Sandbox = createGameSandbox({
            gameController,
            session,
        });

        const resultBuilder: BarkGameResultBuilder = BarkGameResultBuilder.fromScratch();

        loop: while (gameController.statusController.isOnGoing()) {

            if (session.currentRound > this.config.roundLimit) {
                resultBuilder.signal(BARK_GAME_RESULT_SIGNAL.ROUND_LIMIT_REACHED);
                break loop;
            }

            session.nextRound();

            await gameSandbox.evaluate(this.game.script);

            if (gameController.statusController.isComplete()) {
                resultBuilder.signal(BARK_GAME_RESULT_SIGNAL.FINISHED);
                break loop;
            }
        }

        resultBuilder.round(session.currentRound);
        return resultBuilder.build();
    }
}
