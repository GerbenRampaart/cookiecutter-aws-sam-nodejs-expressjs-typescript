const path = require("path");
const findUp = require("find-up");
const sh = require("shelljs");

module.exports.context = async () => {
    const projectRoot = await findUp("package.json");
    const projectRootDir = path.dirname(projectRoot);
    return new buildContext(projectRootDir);
}

class buildContext {
    constructor(rootDir) {
        this._rootDir = rootDir;
    }

    get rootDir() {
        return this._rootDir;
    }

    get distDir() {
        return path.join(this.rootDir, "dist");
    }

    get apiDir() {
        return path.join(this.rootDir, "api");
    }

    get apiBuildDir() {
        return path.join(this.apiDir, "build");
    }

    get webDir() {
        return path.join(this.rootDir, "web");
    }

    get webBuildDir() {
        return path.join(this.webDir, "build");
    }

    get webTargetDir() {
        return path.join(this.distDir, "web");
    }    
};

module.exports.execInDir = (dir, cmd) => {
    console.log(`"${cmd}" => ${dir}`);
    sh.cd(dir);

    const code = sh.exec(cmd).code;
    
    if (code !== 0) {
        throw new TypeError(`Exited with code ${code}`);
    };
}

module.exports.copy = (from, to) => {
    sh.cp("-r", from, to);
    console.log(`Copied ${from} to ${to}`);
};