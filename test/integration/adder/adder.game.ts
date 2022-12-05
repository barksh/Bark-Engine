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
            `let counter = 0`,
            `while (counter < 10) {`,
            `for (const candidate of game.candidates.getCandidates()) {`,
            `game.candidates.executeCandidateScript(candidate, counter, () => {`,
            `counter++;`,
            `});`,
            `}`,
            `}`,
            `game.status.finish();`
        ].join(New_Line_Character),
    });
};
