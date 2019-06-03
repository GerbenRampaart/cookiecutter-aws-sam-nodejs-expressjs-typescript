const utils = require("./utils");
const path = require("path");
const fs = require("fs");
const sh = require("shelljs");

module.exports.build = async () => {
    const ctx = await utils.context();

    if (!fs.existsSync(ctx.testDir)) {
        console.error(`Aborted because ${ctx.testDir} didn't exist`);
        return;
    }
    
    console.log(`Clearing template dir: ${ctx.testDir}`);
    const previous = path.join(ctx.testDir, "*");
    sh.rm("-r", previous);

    console.log(`Deploying template to ${ctx.testDir}`);
    sh.cd(ctx.testDir);
    sh.exec("sam init --runtime nodejs10.x --location ../ --no-input");
};

this.build().then(() => {
    console.log("Done");
});