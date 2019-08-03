import { Context } from "./context";
import { Utils } from "./utils";

const buildSAM = async () => {
    const ctx = await Context.instance();
    Utils.execInDir(ctx.rootDir, "sam build");
};

Utils.execute(buildSAM(), "Build to SAM deployment");
