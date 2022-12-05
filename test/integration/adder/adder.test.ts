/**
 * @author WMXPY
 * @namespace Adder
 * @description Test
 * @override Integration Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { BarkEngine, BarkGameExecuter, BARK_GAME_RESULT_SIGNAL, IBarkGameResult } from "../../../src";
import { createProgressIntegrationGame } from "./adder.game";

describe('Given (Adder) Game', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('integration-adder');

    it('should be able to execute progress game - single round', async (): Promise<void> => {

        const engine: BarkEngine = createProgressIntegrationGame(1);

        const executer: BarkGameExecuter = engine.createExecuter();

        const result: IBarkGameResult = await executer.execute([]);

        expect(result.signal).to.be.equal(BARK_GAME_RESULT_SIGNAL.FINISHED);
        expect(result.round).to.be.equal(1);
    });

    it('should be able to execute progress game - multiple round', async (): Promise<void> => {

        const engine: BarkEngine = createProgressIntegrationGame(10);

        const executer: BarkGameExecuter = engine.createExecuter();

        const result: IBarkGameResult = await executer.execute([]);

        expect(result.signal).to.be.equal(BARK_GAME_RESULT_SIGNAL.FINISHED);
        expect(result.round).to.be.equal(10);
    });
});
