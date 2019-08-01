import { Context } from "./context";
import { Utils } from './utils';
import * as path from 'path';

const start = async () => {
    const ctx = await Context.instance();

    const files = Utils.findInDir(ctx.testDir, "template.yaml", true);
    const templateDir = path.dirname(files[0]);
    
    Utils.execInDir(templateDir, "npm run build")
    Utils.execInDir(templateDir, "npm run start");
};

Utils.execute(start(), "Deploying template");
