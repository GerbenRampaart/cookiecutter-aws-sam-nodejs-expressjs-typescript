import * as sh from "shelljs";
import * as path from "path";
import * as chalk from "chalk";
/*
    https://devhints.io/shelljs
*/
export class Utils {

    public static execInDir(dir: string, cmd: string): void {
        this.cd(dir);

        const options: sh.ExecOptions = {
            silent: true
        };

        this.log(`shelljs.exec("${cmd}", ${JSON.stringify(options)})`, LogLevel.INFO, 2);
        const result = sh.exec(cmd, { silent: true });
        this.processResult(result);
    }

    public static clearDir(dir: string): void {
        this.cd(dir);

        this.log(`shelljs.rm("-rf", "*"`, LogLevel.INFO, 2);
        const result = sh.rm("-rf", "*");
        this.processResult(result);
    }

    public static findInDir(
        dir: string,
        fileNameToFind: string,
        failIfNotSingleResult: boolean): string[] {

        const p = path.join(dir, "**", fileNameToFind);

        this.log(`shelljs.find("${p}"`, LogLevel.INFO, 2);
        const result = sh.find(p);

        if (result.length !== 1 && failIfNotSingleResult) {
            this.explicitFail(1, `Expected a single result`);
        }
        
        return result;
    }

    public static verifyExists(
        path: string, 
        failIfNotExists: boolean): boolean {

        const result = (path !== undefined) && sh.test("-e", path);

        if (!result && failIfNotExists) {
            this.explicitFail(1, `Exiting because path did not exist: ${path}`);
        }

        return result;
    }    

    private static cd(dir: string, failIfDirNotExists: boolean = true) {
        this.verifyExists(dir, failIfDirNotExists);
        
        this.log(`shelljs.cd("${dir}")`, LogLevel.INFO, 2);
        const result = sh.cd(dir);

        this.processResult(result);

        return result;
    }

    private static explicitFail(code: number, msg: string) {
        this.log(msg, LogLevel.ERROR);
        sh.exit(code);
    }

    private static processResult(
        result: sh.ShellReturnValue,
        failIfNot0: boolean = true) {

        if (!result) {
            return;
        }

        if (result.stdout) {
            this.log(result.stdout, LogLevel.SUCCESS, 4);
        }

        if (result.stderr) {
            this.log(result.stderr, LogLevel.ERROR, 4);
        }

        if (result.code !== 0 && failIfNot0) {
            sh.exit(result.code);
        }
    }

    public static log(msg: string, level: LogLevel = LogLevel.INFO, indent: number = 0) {

        if (!msg || msg.trim().length === 0) {
            return;
        }

        const ind = " ".repeat(indent);
        let line = msg;
        line = line.replace("\n", `\n${ind}`);

        if (level === LogLevel.ERROR) {
            line = chalk.default.red(line);
        } else if (level === LogLevel.SUCCESS) {
            line = chalk.default.green(line);
        } else if (level === LogLevel.WARNING) {
            line = chalk.default.yellow(line);
        } else { // Either INFO or something else
            line = chalk.default.blue(line);
        }

        sh.echo(`${ind}${line}`);
    }
}

export enum LogLevel {
    INFO, WARNING, ERROR, SUCCESS
}