/**
 * @author WMXPY
 * @namespace Game_Controller
 * @description UI
 */

import { BarkUI } from "../../ui/ui";

export class BarkGameUIController {

    public static fromUI(
        ui: BarkUI,
    ): BarkGameUIController {

        return new BarkGameUIController(ui);
    }

    private readonly _ui: BarkUI;

    private constructor(ui: BarkUI) {

        this._ui = ui;
    }

    public createObject(): Record<string, any> {

        return {
            updateField: (key: string, value: any) => this._ui.updateField(key, value),
        };
    }
}
