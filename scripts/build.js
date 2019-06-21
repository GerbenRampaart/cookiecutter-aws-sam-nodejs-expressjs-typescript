const utils = require("./utils");
const path = require("path");
const fs = require("fs");
const sh = require("shelljs");
const find = require("find");

module.exports.build = async () => {
    const ctx = await utils.context();

    console.log(`Clearing template dir: ${ctx.testDir}`);
    sh.rm("-r", ctx.testDir);

    if (!fs.existsSync(ctx.testDir)) {
        sh.mkdir(ctx.testDir);
    }

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

    sh.cd(templateDir);
};

this.build().then(() => {
    console.log("Done");
});