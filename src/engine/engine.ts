/**
 * @author WMXPY
 * @namespace Engine
 * @description Engine
 */

import { IBarkGame } from "../game/declare";
import { BarkGameExecuter } from "../game/executer";
import { BarkUI } from "../ui/ui";

export class BarkEngine {

    public static fromGame(game: IBarkGame): BarkEngine {

        return new BarkEngine(game);
    }

    private readonly game: IBarkGame;

    private constructor(game: IBarkGame) {

        this.game = game;
    }

    public createExecuter(ui: BarkUI): BarkGameExecuter {

        return BarkGameExecuter.fromGame(this.game, ui);
    }
}
