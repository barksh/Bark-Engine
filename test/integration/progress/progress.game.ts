/**
 * @author WMXPY
 * @namespace Progress
 * @description Game
 * @override Integration Data
 */

import { New_Line_Character } from "@sudoo/marked";
import { BarkEngine } from "../../../src";

export const createProgressIntegrationGame = (round: number): BarkEngine => {

    return BarkEngine.fromGame({

        identifier: 'progress',
        script: [
            `if (game.status.getRound() === ${round}) {`,
            `game.status.finish();`,
            `}`,
        ].join(New_Line_Character),
    });
};
