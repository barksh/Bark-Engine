/**
 * @author WMXPY
 * @namespace Progress
 * @description Game
 * @override Integration Data
 */

import { New_Line_Character } from "@sudoo/marked";
import { BarkEngine } from "../../../src";

export const createProgressIntegrationGame = (): BarkEngine => {

    return BarkEngine.fromGame({

        identifier: 'progress',
        script: [

        ].join(New_Line_Character),
    });
};
