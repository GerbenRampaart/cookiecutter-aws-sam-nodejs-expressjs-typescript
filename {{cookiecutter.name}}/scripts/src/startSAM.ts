import { Context } from "./context";
import { Utils } from "./utils";

const startSAM = async () => {
    const ctx = await Context.instance();
    Utils.execInDir(ctx.samBuildTargetDir, "sam local start-api");
};

Utils.execute(startSAM(), "Starting SAM Api");
