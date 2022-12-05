/**
 * @author WMXPY
 * @namespace Adder
 * @description Game
 * @override Integration Data
 */

import { New_Line_Character } from "@sudoo/marked";
import { BarkEngine } from "../../../src";

export const createAdderIntegrationGame = (): BarkEngine => {

    return BarkEngine.fromGame({

        identifier: 'adder',
        script: [
            `log.info(game.candidates.getCandidates())`,
        ].join(New_Line_Character),
    });
};
