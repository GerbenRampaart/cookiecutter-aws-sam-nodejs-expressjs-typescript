const utils = require("./utils");
const path = require("path");
const sh = require("shelljs");

module.exports.test = async () => {
    const ctx = await utils.context();

    console.log(`Clearing template dir: ${ctx.testDir}`);
    const previous = path.join(ctx.testDir, "*");
    sh.rm("-r", previous);

    console.log(`Deploying template to ${ctx.testDir}`);
    sh.cd(ctx.testDir);
    sh.exec("sam init -l ../ --no-input");
};

this.test().then(() => {
    console.log("Done");
});