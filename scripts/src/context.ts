import findUp = require("find-up");
import * as path from "path";

export const context = async () => {
    const projectRoot = await findUp("package.json");
    const projectRootDir = path.dirname(projectRoot);
    return new buildContext(projectRootDir);
}

class buildContext {
    _rootDir: any;
    constructor(rootDir) {
        this._rootDir = rootDir;
    }

    get rootDir() {
        return this._rootDir;
    }

    get projectDir() {
        return path.join(this.rootDir, "{{cookiecutter.name}}");
    }

    get testDir() {
        return path.join(this.rootDir, "test");
    }

    get templateApipiDir() {
        return path.join(this.projectDir, "api");
    }
};