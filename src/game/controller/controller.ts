/**
 * @author WMXPY
 * @namespace Game_Controller
 * @description Controller
 */

export interface IBarkGameController<Snapshot> {

    createSnapshot(): Snapshot;
    createSandboxObject(): Record<string, (...args: any[]) => any>;
}
