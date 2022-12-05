/**
 * @author WMXPY
 * @namespace Game
 * @description Executer
 */

import { END_SIGNAL, MarkedResult, Sandbox } from "@sudoo/marked";
import { IBarkCandidate } from "../candidate/declare";
import { BarkLog, BARK_LOG_LEVEL } from "../log/log";
import { BarkSession } from "../session/session";
import { BarkGameAdditionalArgument } from "./additional-argument";
import { BarkGameController } from "./controller/game";
import { IBarkGame } from "./declare";
import { BarkGameResultBuilder, BARK_GAME_RESULT_SIGNAL, IBarkGameResult } from "./result";
import { createGameSandbox } from "./sandbox";

export interface IBarkGameExecuterConfig {

    readonly roundLimit: number;

    readonly logLevel: BARK_LOG_LEVEL;
}

export class BarkGameExecuter {

    public static fromGame(
        game: IBarkGame,
        config: Partial<IBarkGameExecuterConfig> = {},
    ): BarkGameExecuter {

        const fixedConfig: IBarkGameExecuterConfig = {
            roundLimit: 100,
            logLevel: BARK_LOG_LEVEL.INFO,
            ...config,
        };

        return new BarkGameExecuter(game, fixedConfig);
    }

    private readonly game: IBarkGame;
    private readonly config: IBarkGameExecuterConfig;

    private constructor(
        game: IBarkGame,
        config: IBarkGameExecuterConfig,
    ) {

        this.game = game;
        this.config = config;
    }

    public async execute(candidates: IBarkCandidate[]): Promise<IBarkGameResult> {

        const additionalArgument: BarkGameAdditionalArgument =
            BarkGameAdditionalArgument.create();

        const log: BarkLog = BarkLog.fromLevel(this.config.logLevel);

        const gameController: BarkGameController =
            BarkGameController.fromConfig({
                candidates,
                log,
            });

        const session: BarkSession = BarkSession.create();

        const resultBuilder: BarkGameResultBuilder = BarkGameResultBuilder.fromScratch();

        loop: while (gameController.statusController.isOnGoing()) {

            try {

                if (gameController.statusController.getCurrentRound() > this.config.roundLimit) {
                    resultBuilder.signal(BARK_GAME_RESULT_SIGNAL.ROUND_LIMIT_REACHED);
                    break loop;
                }

                gameController.statusController.nextRound();

                const gameSandbox: Sandbox = createGameSandbox({
                    log,
                    additionalArgument,
                    gameController,
                    session,
                });

                const evaluateResult: MarkedResult = await gameSandbox.evaluate(this.game.script);

                if (evaluateResult.signal === END_SIGNAL.FAILED) {
                    resultBuilder
                        .signal(BARK_GAME_RESULT_SIGNAL.FAILED)
                        .reason(evaluateResult.error);
                    break loop;
                }

                if (evaluateResult.signal === END_SIGNAL.EXCEPTION) {
                    resultBuilder
                        .signal(BARK_GAME_RESULT_SIGNAL.EXCEPTION)
                        .reason(evaluateResult.exception);
                    break loop;
                }

                if (evaluateResult.signal === END_SIGNAL.TERMINATED) {
                    resultBuilder.signal(BARK_GAME_RESULT_SIGNAL.TERMINATED);
                    break loop;
                }

                if (gameController.statusController.isComplete()) {
                    resultBuilder.signal(BARK_GAME_RESULT_SIGNAL.FINISHED);
                    break loop;
                }
            } catch (error) {

                resultBuilder
                    .signal(BARK_GAME_RESULT_SIGNAL.FAILED)
                    .reason(error);
                break loop;
            }
        }

        resultBuilder.round(gameController.statusController.getCurrentRound());
        return resultBuilder.build();
    }
}
