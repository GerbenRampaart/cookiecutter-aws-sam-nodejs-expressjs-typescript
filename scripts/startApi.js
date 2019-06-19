const utils = require("./utils");
const find = require("find");
const path = require("path");
const sh = require("shelljs");

module.exports.startApi = async () => {
    const ctx = await utils.context();
    sh.cd(ctx.testDir);

    // Right now we assume that we have one deployed test application in './test'
    const templates = find.fileSync("template.yaml", ctx.testDir);

    if (templates.length !== 1) {
        console.error("No deployed templates found. Run 'npm run build'");
        return;
    }

    const templateDir = path.dirname(templates[0]);
    
    utils.execInDir(templateDir, "npm run build")
    utils.execInDir(templateDir, "npm run start");

    sh.cd(ctx.rootDir);
};

this.startApi().then(() => {
    console.log("Done");
});