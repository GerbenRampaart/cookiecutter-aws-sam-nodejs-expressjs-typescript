const utils = require("./utils");
const path = require("path");
const sh = require("shelljs");
const fs = require("fs");

module.exports.startApi = async () => {
    const ctx = await utils.context();

    console.log(`Clearing dist dir: ${ctx.distDir}`);

    if (!fs.existsSync(ctx.distDir)) {
        throw new TypeError(`Expected directory ${ctx.distDir}`);
    }

    sh.rm("-r", path.join(ctx.distDir, "*"));

    utils.execInDir(ctx.apiDir, "npm install --loglevel=error");
    utils.execInDir(ctx.apiDir, "npm run build");

    utils.copy(path.join(ctx.apiBuildDir, "/."), ctx.apiTargetDir);

    utils.copy(path.join(ctx.apiDir, "package.json"), ctx.distDir);
    utils.copy(path.join(ctx.apiDir, "package-lock.json"), ctx.distDir);
    utils.execInDir(ctx.distDir, "npm install --production");

    utils.execInDir(ctx.webDir, "npm install --loglevel=error");
    utils.execInDir(ctx.webDir, "npm run build");

    if (fs.existsSync(ctx.webTargetDir)) {
        sh.mkdir(ctx.webTargetDir);
    }
    
    utils.copy(ctx.webBuildDir, ctx.webTargetDir);

    sh.cd(ctx.rootDir);
};

this.startApi()    
    .then(() => {
        console.log("SUCCESS");
    }
    ).catch((err) => {
        console.error("FAILURE");
        console.error(err); 
    });