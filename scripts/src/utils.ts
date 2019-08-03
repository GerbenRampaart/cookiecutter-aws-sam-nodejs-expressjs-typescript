import { ExecOptions, exec, cp, cd, find, test, cat, echo, exit, rm, ShellReturnValue, mkdir } from "shelljs";
import { join, dirname } from "path";
import { EOL, cpus } from "os";
import * as chalk from "chalk";

/*
    https://devhints.io/shelljs

    Note: This wrapper around shelljs mainly exists because:
        -   The scripts must be really negative, if any command does not work
            the process must exit. Even when the directory does not exist when 
            doing "cd" the process needs to stop.
        -   I like to use chalk to add coloring to the stderr and stdout.
        -   It allows for for some isolated behaviour.
    Other design goals:
        -   Always do any IO using shelljs for consistancy. So use shelljs.echo 
            instead of console.log and use shelljs.test instead of fs.existsSync
            and so on.
        -   All operations must be explicitly sync to avoid any unexpected behaviour.
            Promises are made sync (non-blocking) by using aync/await. 
*/
export class Utils {

    public static execInDir(dir: string, cmd: string): void {
        this.cd(dir);

        const options: ExecOptions = {
            silent: true
        };

        this.log(`shelljs.exec("${cmd}"), ${JSON.stringify(options)})`, LogLevel.INFO, 2);
        const result = exec(cmd, { silent: true });
        this.processResult(result);
    }

    public static clearDir(dir: string): void {
        this.cd(dir);

        this.log(`shelljs.rm("-rf", "*")`, LogLevel.INFO, 2);
        const result = rm("-rf", "*");
        this.processResult(result);
    }

    public static findInDir(
        dir: string,
        fileNameToFind: string,
        failIfNotSingleResult: boolean): string[] {

        const p = join(dir, "**", fileNameToFind);

        this.log(`shelljs.find("${p}")`, LogLevel.INFO, 2);
        const result = find(p);

        if (result.length !== 1 && failIfNotSingleResult) {
            this.explicitFail(1, `Expected a single result`);
        }

        this.processResult(result);
        
        return result;
    }

    public static verifyExists(
        path: string, 
        failIfNotExists: boolean): boolean {
        
        path = dirname(path);
        
        this.log(`shelljs.test("-e", "${path}")`, LogLevel.INFO, 2);
        const result = (path !== undefined) && test("-e", path);
        this.log(String(result), LogLevel.SUCCESS, 4);

        if (!result && failIfNotExists) {
            this.explicitFail(1, `Exiting because path did not exist: ${path}`);
        }

        return result;
    }    

    public static cd(dir: string, failIfDirNotExists: boolean = true): void {
        this.verifyExists(dir, failIfDirNotExists);
        
        this.log(`shelljs.cd("${dir}")`, LogLevel.INFO, 2);
        const result = cd(dir);

        this.processResult(result);
    }

    public static cp(from: string, to: string): void {
        this.verifyExists(from, true);
        this.verifyExists(to, true);

        this.log(`shelljs.cp("-r", "${from}", "${to}")`, LogLevel.INFO, 2);
        const result = cp("-r", from, to);
        this.processResult(result);
    }

    public static mkdir(dir: string) {
        const exists = this.verifyExists(dir, false);

        if (exists) {
            // Already exists. No need to do mkdir.
            return;
        }

        this.log(`shelljs.mkdir("${dir}")`, LogLevel.INFO, 2);
        const result = mkdir(dir);
        this.processResult(result);
    }

    public static cat(file: string): string {
        this.verifyExists(file, true);

        this.log(`shelljs.cat("${file}")`, LogLevel.INFO, 2);
        const result = cat(file);
        this.processResult(result);

        return result.stdout;
    }

    public static explicitFail(code: number, msg: string) {
        this.log(msg, LogLevel.ERROR);
        exit(code);
    }

    private static processResult(
        result: ShellReturnValue,
        failIfNot0: boolean = true) {

        if (!result) {
            return;
        }

        if (result.stdout) {
            this.log(result.stdout, LogLevel.SUCCESS, 4);
        }

        if (result.stderr) {
            // Display a little more if it's an error.
            this.log(result.stderr, LogLevel.ERROR, 4, 20);
        }

        if (result.code !== 0 && failIfNot0) {
            throw new TypeError(result.stderr);
        }
    }

    public static log(msg: string, level: LogLevel = LogLevel.INFO, indent: number = 0, maxLines: number = 5) {
        if (!msg) {
            return;
        }

        if (typeof msg === "object") {
            msg = JSON.stringify(msg);
        }

        if (msg.trim().length === 0) {
            return;
        }

        const ind = " ".repeat(indent);
        let lines = msg.split(EOL);

        let ch: (msg: string) => string = null;

        if (level === LogLevel.ERROR) {
            ch = (msg: string) => chalk.default.red(msg);
        } else if (level === LogLevel.SUCCESS) {
            ch = (msg: string) => chalk.default.green(msg);
        } else if (level === LogLevel.WARNING) {
            ch = (msg: string) => chalk.default.yellow(msg);
        } else { // Either INFO or something else
            ch = (msg: string) => chalk.default.blue(msg);
        }

        if (lines.length > maxLines) {
            const summary = `... showing ${maxLines} of ${lines.length} lines ...`;
            lines = lines.slice(0, maxLines);
            lines.push(summary);
        }

        lines.forEach((line: string) => {
            echo(ch(`${ind}${line}`));
        });
    }

    public static writeSeparator(): void {
        let separator = "-".repeat(process.stdout.columns);
        separator = `\n${separator}`;
        this.log(separator, LogLevel.INFO);
    }

    public static execute(promise: Promise<void>, description: string) {
        promise
            .then(() => {
                this.writeSeparator();
                this.log(`SUCCESS: ${description}`, LogLevel.SUCCESS);
            })
            .catch((err: any) => {
                this.writeSeparator();
                this.log(`FAILURE: ${description}`, LogLevel.ERROR);
                this.writeSeparator();
                this.explicitFail(1, err);
            });
    }
}

export enum LogLevel {
    INFO, WARNING, ERROR, SUCCESS
}