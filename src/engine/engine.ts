/**
 * @author WMXPY
 * @namespace Engine
 * @description Engine
 */

import { IBarkGame } from "../game/declare";

export class BarkEngine {

    public static fromGame(game: IBarkGame): BarkEngine {

        return new BarkEngine(game);
    }

    private readonly game: IBarkGame;

    private constructor(game: IBarkGame) {

        this.game = game;
    }
}
