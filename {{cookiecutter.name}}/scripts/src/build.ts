import { Context } from "./context";
import { Utils, LogLevel } from "./utils";
import { join } from "path";

//process.env["BUILD_API"] = "true"; 
//process.env["BUILD_WEB"] = "true"; 

const env = (envVar: string) => {
    let result = process.env[envVar] === "true";
    Utils.log(envVar, LogLevel.INFO, 2);
    Utils.log(String(result), LogLevel.SUCCESS, 4);
    return result;
};

const build = async () => {
    const ctx = await Context.instance();

    const buildApi = env("BUILD_API");
    const buildWeb = env("BUILD_WEB");

    Utils.clearDir(ctx.distDir);

    if (buildApi) {
        Utils.execInDir(ctx.apiDir, "npm install --loglevel=error");
        Utils.execInDir(ctx.apiDir, "npm run build");
        Utils.mkdir(ctx.apiTargetDir);
        Utils.cp(join(ctx.apiBuildDir, "/."), ctx.apiTargetDir);
        Utils.cp(join(ctx.apiDir, "package.json"), ctx.distDir);
        Utils.cp(join(ctx.apiDir, "package-lock.json"), ctx.distDir);
        Utils.execInDir(ctx.distDir, "npm install --production");
    }

    if (buildWeb) {
        Utils.execInDir(ctx.webDir, "npm install --loglevel=error");
        Utils.execInDir(ctx.webDir, "npm run build");
        Utils.mkdir(ctx.webTargetDir);
        Utils.cp(join(ctx.webBuildDir, "/."), ctx.webTargetDir);
    }
};

Utils.execute(build(), "Building App");
