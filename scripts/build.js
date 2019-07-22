const utils = require("./utils");
const path = require("path");
const fs = require("fs");
const sh = require("shelljs");
const find = require("find");

module.exports.build = async () => {
    const ctx = await utils.context();

    console.log(`Clearing template dir: ${ctx.testDir}`);

    if (!fs.existsSync(ctx.testDir)) {
        throw new TypeError(`Expected directory ${ctx.testDir}`);
    }

    sh.rm("-rf", path.join(ctx.testDir, "*"));

    console.log(`Deploying template to ${ctx.testDir}`);
    sh.cd(ctx.testDir);
    sh.exec("sam init --location ../ --no-input");

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