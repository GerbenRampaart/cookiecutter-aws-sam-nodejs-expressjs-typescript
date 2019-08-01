import findUp = require("find-up");
import { dirname, join } from "path";

export class Context {

    public static async instance() {
        const projectRoot = await findUp("package.json");
        const projectRootDir = dirname(projectRoot);
        return new Context(projectRootDir);
    }

    _rootDir: any;

    constructor(rootDir) {
        this._rootDir = rootDir;
    }

    get rootDir() {
        return this._rootDir;
    }

    get projectDir() {
        return join(this.rootDir, "{{cookiecutter.name}}");
    }

    get testDir() {
        return join(this.rootDir, "test");
    }

    get templateApiDir() {
        return join(this.projectDir, "api");
    }
};