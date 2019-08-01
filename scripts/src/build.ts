import { Utils, LogLevel } from "./utils";
import { dirname, join } from "path";
import { Context } from "./context";
import { IPackageJSON } from "./IPackageJSON";

const build = async () => {
    const ctx = await Context.instance();

    Utils.clearDir(ctx.testDir);
    Utils.execInDir(ctx.testDir, "sam init --location ../ --no-input");

    const files = Utils.findInDir(ctx.testDir, "template.yaml", true);
    const templateDir = dirname(files[0]);    

    const packageJSONString = Utils.cat(join(templateDir, "package.json"));
    const packageJSON: IPackageJSON = JSON.parse(packageJSONString);
    const scripts = packageJSON.scripts;
    
    Utils.writeSeparator();
    
    const l = (msg: string) => { Utils.log(msg, LogLevel.SUCCESS, 4) }
    l("Execute the following:");
    l(`- cd ${templateDir}`);
    l("- npm install");

    if (scripts) {
        for (let key in scripts) {
            let value = scripts[key];
            l(`- npm run ${key}`);
        }
    }
};

Utils.execute(build(), "Running 'sam init'");
