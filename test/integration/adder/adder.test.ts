/**
 * @author WMXPY
 * @namespace Adder
 * @description Test
 * @override Integration Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { BarkEngine, BarkGameExecuter, IBarkGameResult } from "../../../src";
import { verifyGameSignalFinished } from "../../util/verify-result-signal";
import { createAdderIntegrationGame } from "./adder.game";

describe('Given (Adder) Game', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('integration-adder');

    it('should be able to execute progress game - single round', async (): Promise<void> => {

        const engine: BarkEngine = createAdderIntegrationGame();

        const executer: BarkGameExecuter = engine.createExecuter();
        executer.log.addListener(console.log);

        const result: IBarkGameResult = await executer.execute([]);

        verifyGameSignalFinished(result);
        expect(result.round).to.be.equal(1);
    });
});
