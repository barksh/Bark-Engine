/**
 * @author WMXPY
 * @namespace Game_Controller
 * @description UI
 */

import { BarkUI } from "../../ui/ui";
import { BarkGameAdditionalArgument } from "../additional-argument";

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

            updateField: (_additionalArgument: BarkGameAdditionalArgument, key: string, value: any) => {
                this._ui.updateField(key, value);
            },
        };
    }
}
