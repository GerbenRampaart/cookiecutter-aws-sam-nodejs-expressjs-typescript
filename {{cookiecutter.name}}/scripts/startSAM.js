const utils = require("./utils");

module.exports.startApi = async () => {
    const ctx = await utils.context();

    utils.execInDir(ctx.rootDir, "sam build");
    utils.execInDir(ctx.samBuildTargetDir, "sam local start-api");
};

this.startApi()
    .then(() => {
        console.log("SUCCESS");
    }
    ).catch((err) => {
        console.error("FAILURE");
        console.error(err); 
    });