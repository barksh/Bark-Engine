/**
 * @author WMXPY
 * @namespace Adder
 * @description Candidate
 * @override Integration Data
 */

import { New_Line_Character } from "@sudoo/marked";
import { IBarkCandidate } from "../../../src";

export const createAdderIntegrationCandidate = (
    identifier: string,
): IBarkCandidate => {

    return {
        identifier,
        script: [
            `log.info(input);`,
            `action.takeAction();`,
        ].join(New_Line_Character),
    };
};
