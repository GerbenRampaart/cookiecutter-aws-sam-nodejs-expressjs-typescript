import { Utils } from "./utils";
import * as path from "path";
import { Context } from "./context";

const build = async () => {
    const ctx = await Context.instance();

    Utils.exists(ctx.testDir, true);
    Utils.clearDir(ctx.testDir);
    Utils.execInDir(ctx.testDir, "sam init --location ../ --no-input");

    const files = Utils.findInDir(ctx.testDir, "template.yaml", true);
    const templateDir = path.dirname(files[0]);    

    // sh.cd won't work because it's not the current shell you execute this on.
    console.info("Execute the following:");
    console.info(`- cd ${templateDir}`);
    console.info("- npm install");
    console.info("- npm run build");
    console.info("- npm run start:sam (for the AWS SAM api)");
    console.info("- npm run start:express (for the standalone express app)");
};

build()
    .then(() => {
        console.log("SUCCESS");
    }
    ).catch((err) => {
        console.error("FAILURE");
        console.error(err); 
    });