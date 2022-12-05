/**
 * @author WMXPY
 * @namespace Progress
 * @description Test
 * @override Integration Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { BarkEngine } from "../../../src";
import { BarkGameExecuter } from "../../../src/game/executer";
import { BARK_GAME_RESULT_SIGNAL, IBarkGameResult } from "../../../src/game/result";
import { createProgressIntegrationGame } from "./progress.game";

describe('Given (Progress) Game', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('integration-progress');

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
