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

    get apiDir() {
        return path.join(this.projectDir, "api");
    }

    get apiBuildDir() {
        return path.join(this.templateApiDir, "build");
    }
};

module.exports.execInDir = (dir, cmd) => {
    console.log(`"${cmd}" => ${dir}`);
    sh.cd(dir);
    sh.exec(cmd);
}

module.exports.copy = (from, to) => {
    sh.cp("-r", from, to);
    console.log(`Copied ${from} to ${to}`);
};