const utils = require("./utils");
const find = require("find");
const path = require("path");
const sh = require("shelljs");

module.exports.startApi = async () => {
    const ctx = await utils.context();

    utils.execInDir(ctx.rootDir, "sam local start-api");

    sh.cd(ctx.rootDir);
};

this.startApi().then(() => {
    console.log("Done");
});