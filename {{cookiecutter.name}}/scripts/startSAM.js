const utils = require("./utils");
const find = require("find");
const path = require("path");
const sh = require("shelljs");

module.exports.startApi = async () => {
    const ctx = await utils.context();

    utils.execInDir(ctx.rootDir, "sam build");
    utils.execInDir(ctx.rootDir, "sam local start-api");
};

this.startApi()
    .then(() => {
        console.log("SUCCESS");
    }
    ).catch((err) => {
        console.error("FAILURE");
        console.error(err); 
    });