import * as sh from "shelljs";
import * as path from "path";
import * as chalk from "chalk";
/*
    https://devhints.io/shelljs
*/
export class Utils {

    public static execInDir(dir: string, cmd: string): sh.ShellString {

        this.exists(dir, true);

        this.invoke(() => sh.cd(dir), dir);
        const result = this.invoke(() => sh.exec(cmd, { silent: true }), cmd, { silent: true });
        return result as sh.ShellString;
    }

    public static clearDir(dir: string) {

        this.exists(dir, true);

        this.invoke(() => sh.cd(dir), dir);
        this.invoke(() => sh.rm("-rf", "*"), "-rf", "*");
    }

    public static findInDir(
        dir: string,
        fileNameToFind: string,
        failIfNotSingleResult: boolean): sh.ShellArray {

        const p = path.join(dir, "**", fileNameToFind);
        // this.invoke(() => sh.cd(dir), dir);
        const result = this.invoke(() => sh.find(p), p) as sh.ShellArray;

        if (result.length !== 1 && failIfNotSingleResult) {
            this.fail(1, `Expected a single result`);
        }
        
        return result as sh.ShellArray;
    }

    public static exists(
        path: string, 
        failIfNotExists: boolean): boolean {

        const result = sh.test("-e", path);

        if (!result && failIfNotExists) {
            this.fail(1, `Exiting because path did not exist`);
        }

        return result;
    }    

    private static invoke(func: (...params: any[]) => sh.ShellReturnValue, ...params: any[]): sh.ShellReturnValue {
        let name = func.toString();
        name = name.replace("() => ", "");
        name = name.substring(0, name.indexOf("("));

        const args = params.join(", ");
        const cmd = `${name}(${args})`;

        this.log(cmd, LogLevel.INFO, 2);

        let result = null;

        try {
            result = func(params);
            this.log(result.stdout, LogLevel.SUCCESS, 4);
        } catch (error) {
            this.fail(1, error);
        }

        this.failIfNot0(result);

        return result;
    }

    private static failIfNot0(result: sh.ShellReturnValue) {
        // If any shelljs command fails,
        // fail the whole execution.

        if (!result) {
            this.fail(1, "No result");
        }

        if (result.code !== 0) {
            this.fail(result.code, result.stdout);
        }
    }

    private static fail(code: number, message: string) {
        this.log(message, LogLevel.ERROR);
        sh.exit(code);
    }

    public static log(msg: string, level: LogLevel = LogLevel.INFO, indent: number = 0) {

        if (!msg || msg.trim().length === 0) {
            return;
        }

        const ind = " ".repeat(indent);
        let line = msg;

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