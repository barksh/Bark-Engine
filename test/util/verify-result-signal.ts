/**
 * @author WMXPY
 * @namespace Util
 * @description Verify Result Signal
 * @override Test Util
 */

import { BARK_GAME_RESULT_SIGNAL, IBarkGameResult } from "../../src";
import { expect } from "chai";

export const verifyGameSignalFinished = (result: IBarkGameResult): void => {

    if (result.signal !== BARK_GAME_RESULT_SIGNAL.FINISHED) {
        console.log(result);
    }

    expect(result.signal).to.be.equal(BARK_GAME_RESULT_SIGNAL.FINISHED);
};
