import { Context } from "./context";
import { Utils } from "./utils";

const startExpress = async () => {
    const ctx = await Context.instance();
    Utils.execInDir(ctx.apiTargetDir, "node app.local.js");
};

Utils.execute(startExpress(), "Starting express local");
