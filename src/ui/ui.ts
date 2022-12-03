/**
 * @author WMXPY
 * @namespace UI
 * @description UI
 */

export class BarkUI {

    public static fromScratch(): BarkUI {

        return new BarkUI();
    }

    private readonly _fields: Map<string, any>;

    private constructor() {

        this._fields = new Map();
    }

    public updateField(key: string, value: any): this {

        this._fields.set(key, value);
        return this;
    }
}
