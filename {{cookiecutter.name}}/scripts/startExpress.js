const utils = require("./utils");

module.exports.startApi = async () => {
    const ctx = await utils.context();

    utils.execInDir(ctx.apiTargetDir, "node app.local.js");
};

this.startApi()
    .then(() => {
        console.log("SUCCESS");
    }
    ).catch((err) => {
        console.error("FAILURE");
        console.error(err); 
    });