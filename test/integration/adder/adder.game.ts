/**
 * @author WMXPY
 * @namespace Adder
 * @description Game
 * @override Integration Data
 */

import { New_Line_Character } from "@sudoo/marked";
import { BarkEngine } from "../../../src";

export const createProgressIntegrationGame = (round: number): BarkEngine => {

    return BarkEngine.fromGame({

        identifier: 'adder',
        script: [
            `if (game.candidates.getCandidates() === ${round}) {`,
            `game.status.finish();`,
            `}`,
        ].join(New_Line_Character),
    });
};
