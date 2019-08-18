import {
  json,
  Options,
  OptionsJson,
  OptionsText,
  OptionsUrlencoded,
  raw,
  text,
  urlencoded
} from "body-parser";
import { RequestHandler } from "express";

export const bodyParsers = () => {
  // https://www.npmjs.com/package/body-parser
  const options: Options = {
    // verify: (req: IncomingMessage, res: ServerResponse, buf: Buffer, encoding: string) => { },
    inflate: true,
    limit: "10mb"
  };

  const handlers: RequestHandler[] = [];

  handlers.push(raw(options));

  const optionsJson: OptionsJson = options;
  optionsJson.strict = true; // 'true' means only object and arrays, no strings or bools.
  handlers.push(json(optionsJson));

  const optionsUrlEncoded: OptionsUrlencoded = options;
  optionsUrlEncoded.extended = false; // https://www.npmjs.com/package/body-parser#extended
  handlers.push(urlencoded(optionsUrlEncoded));

  const optionsText: OptionsText = options;
  optionsText.defaultCharset = "utf-8";
  handlers.push(text(optionsText));

  return handlers;
};

