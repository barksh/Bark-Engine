/**
 * @author WMXPY
 * @namespace Progress
 * @description Test
 * @override Integration Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { BarkEngine } from "../../../src";
import { createProgressIntegrationGame } from "./progress.game";

describe('Given (Progress) Game', (): void => {

    const chance: Chance.Chance = new Chance('integration-progress');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const engine: BarkEngine = createProgressIntegrationGame();

    it('Placeholder', (): void => {

        expect(chance.string()).to.be.not.equal(chance.string());
    });
});
