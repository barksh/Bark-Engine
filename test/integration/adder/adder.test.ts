/**
 * @author WMXPY
 * @namespace Adder
 * @description Test
 * @override Integration Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { BarkEngine, BarkGameExecuter, IBarkCandidate, IBarkGameResult } from "../../../src";
import { BARK_LOG_LEVEL, BARK_LOG_SCOPE } from "../../../src/log/log";
import { verifyGameSignalFinished } from "../../util/verify-result-signal";
import { createAdderIntegrationCandidate } from "./adder.candidate";
import { createAdderIntegrationGame } from "./adder.game";

describe('Given (Adder) Game', (): void => {

    const chance: Chance.Chance = new Chance('integration-adder');

    it('should be able to execute adder game', async (): Promise<void> => {

        const engine: BarkEngine = createAdderIntegrationGame();

        const executer: BarkGameExecuter = engine.createExecuter();

        const candidateIdentifier: string = chance.word();
        const candidate: IBarkCandidate = createAdderIntegrationCandidate(
            candidateIdentifier,
        );

        const result: IBarkGameResult = await executer.execute([
            candidate,
        ]);

        verifyGameSignalFinished(result);

        expect(executer.log.records).to.be.deep.equal([{
            scope: BARK_LOG_SCOPE.CANDIDATE,
            category: candidateIdentifier,
            level: BARK_LOG_LEVEL.INFO,
            args: [
                "input",
            ],
        }]);
        expect(result.round).to.be.equal(1);
    });
});
