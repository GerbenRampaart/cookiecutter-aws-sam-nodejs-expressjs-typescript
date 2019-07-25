import { Utils } from "./utils";
import * as path from "path";
import * as fs from "fs";
import * as sh from "shelljs";
import * as find from "find";
import { context } from "./context";

module.exports.build = async () => {
    const ctx = await context();

    // sh.echo(`Clearing template dir: ${ctx.testDir}`);
    Utils.exists(ctx.testDir, true);

    Utils.clearDir(ctx.testDir);

    sh.echo(`Deploying template to ${ctx.testDir}`);
    Utils.execInDir(ctx.testDir, "sam init --location ../ --no-input");
sh.find(ctx.testDir)
    // Right now we assume that we have one deployed test application in './test'
    const templates = find.fileSync("template.yaml", ctx.testDir);

    if (templates.length !== 1) {
        console.error("No deployed templates found. Run 'npm run build'");
        return;
    }

    const templateDir = path.dirname(templates[0]);    

    // sh.cd won't work because it's not the current shell you execute this on.
    console.info("Execute the following:");
    console.info(`- cd ${templateDir}`);
    console.info("- npm install");
    console.info("- npm run build");
    console.info("- npm run start:sam (for the AWS SAM api)");
    console.info("- npm run start:express (for the standalone express app)");
};

this.build()
    .then(() => {
        console.log("SUCCESS");
    }
    ).catch((err) => {
        console.error("FAILURE");
        console.error(err); 
    });