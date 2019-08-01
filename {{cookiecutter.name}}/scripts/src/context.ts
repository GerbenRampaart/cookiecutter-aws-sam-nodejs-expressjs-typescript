import { sync } from "find-up";
import { join, dirname} from "path";
import { Utils } from "./utils";

export class Context {

    public static async instance() {
        const projectRoot = sync("package.json");
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

    get distDir() {
        return join(this.rootDir, "{{cookiecutter.name}}Function");
    }

    get apiDir() {
        return join(this.rootDir, "api");
    }

    get apiBuildDir() {
        return join(this.apiDir, "build");
    }

    get webDir() {
        return join(this.rootDir, "web");
    }

    get webBuildDir() {
        return join(this.webDir, "build");
    }

    get webTargetDir() {
        return join(this.distDir, "web");
    }

    get apiTargetDir() {
        return join(this.distDir, "api");
    }

    get samBuildDir() {
        return join(".aws-sam");
    }

    get samBuildTargetDir() {
        const files = Utils.findInDir(this.samBuildDir, "template.yaml", true);
        return dirname(files[0]);    
    }
};