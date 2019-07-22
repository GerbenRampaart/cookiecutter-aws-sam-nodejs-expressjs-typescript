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

module.exports.execInDir = (dir, cmd) => {
    console.log(`"${cmd}" => ${dir}`);
    sh.cd(dir);
    
    const code = sh.exec(cmd).code;
    
    if (code !== 0) {
        sh.exit(code);
    };
}

module.exports.clearDir = (dir) => {
    if (sh.cd(dir).) {
        
    }
    sh.rm("-rf", "*");
}