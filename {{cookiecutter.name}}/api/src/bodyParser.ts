import { json, Options, OptionsJson, OptionsText, OptionsUrlencoded, raw, text, urlencoded } from "body-parser";
import { NextHandleFunction } from "connect";

export class BodyParser {

    public static parsers
    public get parserJson(): NextHandleFunction {
        return this._parserJson;
    }

    public get parserText(): NextHandleFunction {
        return this._parserText;
    }

    public get parserUrlEncoded(): NextHandleFunction {
        return this._parserUrlEncoded;
    }

    public get parserRaw(): NextHandleFunction {
        return this._parserRaw;
    }

    private _optionsJson: OptionsJson = null;
    private _parserJson: NextHandleFunction = null;

    private _optionsUrlEncoded: OptionsUrlencoded = null;
    private _parserUrlEncoded: NextHandleFunction = null;

    private _optionsText: OptionsText = null;
    private _parserText: NextHandleFunction = null;

    private _parserRaw: NextHandleFunction = null;

    constructor() {
        // https://www.npmjs.com/package/body-parser
        const options: Options = {
            //verify: (req: IncomingMessage, res: ServerResponse, buf: Buffer, encoding: string) => { },
            inflate: true,
            limit: "10mb",
        };

        this._parserRaw = raw(options);

        this._optionsJson = options;
        this._optionsJson.strict = true; // 'true' means only object and arrays, no strings or bools.
        this._parserJson = json(this._optionsJson);

        this._optionsUrlEncoded = options;
        this._optionsUrlEncoded.extended = false; // https://www.npmjs.com/package/body-parser#extended
        this._parserUrlEncoded = urlencoded(this._optionsUrlEncoded);

        this._optionsText = options;
        this._optionsText.defaultCharset = "utf-8";
        this._parserText = text(this._optionsText);
    }
}
