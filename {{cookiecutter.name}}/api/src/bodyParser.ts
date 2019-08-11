import { json, Options, OptionsJson, OptionsText, OptionsUrlencoded, raw, text, urlencoded } from "body-parser";
import { Application } from "express";

export const bodyParser = (app: Application) => {
    // https://www.npmjs.com/package/body-parser
    const options: Options = {
        //verify: (req: IncomingMessage, res: ServerResponse, buf: Buffer, encoding: string) => { },
        inflate: true,
        limit: "10mb"
    };

    app.use(raw(options));

    const optionsJson: OptionsJson = options;
    optionsJson.strict = true; // 'true' means only object and arrays, no strings or bools.
    app.use(json(optionsJson));

    const optionsUrlEncoded: OptionsUrlencoded = options;
    optionsUrlEncoded.extended = false; // https://www.npmjs.com/package/body-parser#extended
    app.use(urlencoded(optionsUrlEncoded));

    const optionsText: OptionsText = options;
    optionsText.defaultCharset = "utf-8";
    app.use(text(optionsText));
};

export default bodyParser;
