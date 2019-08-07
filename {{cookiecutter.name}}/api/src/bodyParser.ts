
import { json, Options, OptionsJson, OptionsText, OptionsUrlencoded, raw, text, urlencoded } from "body-parser";

export class BodyParser {

    public get optionsJson(): OptionsJson {
        return this._optionsJson;
    }

    public get parserJson() {
        return json(this.optionsJson);
    }

    private _optionsJson: OptionsJson = null;

    private _parserJson: OptionsJson = null;
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
}
