import { Utils, LogLevel } from "./utils";
import * as path from "path";
import { Context } from "./context";

const build = async () => {
    const ctx = await Context.instance();

    Utils.verifyExists(ctx.testDir, true);
    Utils.clearDir(ctx.testDir);
    Utils.execInDir(ctx.testDir, "sam init --location ../ --no-input");

    const files = Utils.findInDir(ctx.testDir, "template.yaml", true);
    const templateDir = path.dirname(files[0]);    

    const l = (msg: string) => { Utils.log(msg, LogLevel.SUCCESS, 4) }
    l("Execute the following:");
    l(`- cd ${templateDir}`);
    l("- npm install");
    l("- npm run build");
    l("- npm run start:sam (for the AWS SAM api)");
    l("- npm run start:express (for the standalone express app)");
};

build()
    .then(() => {
        console.log("SUCCESS");
    }
    ).catch((err) => {
        console.error("FAILURE");
        console.error(err); 
    });