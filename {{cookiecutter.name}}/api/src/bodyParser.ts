
import { json, raw, text, OptionsJson, OptionsText, OptionsUrlencoded, urlencoded, Options } from "body-parser";

export class BodyParser {
    constructor() {
        // https://www.npmjs.com/package/body-parser
        const options: Options = {
            //verify: (req: IncomingMessage, res: ServerResponse, buf: Buffer, encoding: string) => { },
            inflate: true,
            limit: "10mb"
        };

        const optionsJson: OptionsJson = options;
        optionsJson.strict = true; // 'true' means only object and arrays, no strings or bools.

        const jsonParser = json(optionsJson);

        const optionsUrlEncoded: OptionsUrlencoded = options;
        optionsUrlEncoded.extended = false; // https://www.npmjs.com/package/body-parser#extended

        const urlencodedParser = urlencoded(optionsUrlEncoded);
    }

    private _optionsJson: OptionsJson = null;

    public get optionsJson(): OptionsJson {
        return this._optionsJson;
    }

    private _parserJson: OptionsJson = null;

    public get parserJson() {
        return json(this.optionsJson);
    }
}