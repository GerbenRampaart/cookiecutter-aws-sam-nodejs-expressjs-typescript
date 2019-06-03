const path = require("path");
const findUp = require("find-up");

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

    get projectDir() {
        return path.join(this.rootDir, "{{cookiecutter.projectName}}");
    }

    get testDir() {
        return path.join(this.rootDir, "test");
    }
};

