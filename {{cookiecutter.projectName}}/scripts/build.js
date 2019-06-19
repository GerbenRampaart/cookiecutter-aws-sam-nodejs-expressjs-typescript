const utils = require("./utils");
const find = require("find");
const path = require("path");
const sh = require("shelljs");

module.exports.startApi = async () => {
    const ctx = await utils.context();

    utils.execInDir(ctx.apiDir, "npm install --no-audit");
    utils.execInDir(ctx.apiDir, "tsc -p .");

    utils.copy(path.join(ctx.apiDir, "package.json"), ctx.apiBuildDir);
    utils.copy(path.join(ctx.apiDir, "package-lock.json"), ctx.apiBuildDir);

    sh.cd(ctx.rootDir);
};

this.startApi().then(() => {
    console.log("Done");
});