import * as sh from "shelljs";

/*
    https://devhints.io/shelljs
*/
export class Utils {

    public static execInDir(dir: string, cmd: string): sh.ShellString {
        this.invoke(() => sh.cd(dir));
        const result = this.invoke(() => sh.exec(cmd));
        return result as sh.ShellString;
    }

    public static clearDir(dir: string) {
        this.invoke(() => sh.cd(dir));
        this.invoke(() => sh.rm("-rf", "*"));
    }

    public static findInDir(
        dir: string,
        failIfNotSingleResult: number): sh.ShellArray {
        this.invoke(() => sh.cd(dir));
        const result = this.invoke(() => sh.find()) as sh.ShellArray;

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

    private static invoke(func: (...params: any[]) => sh.ShellReturnValue): sh.ShellReturnValue {
        let name = func.toString();
        name = name.replace("() => ", "");
        //func.arguments
        //log = `${log}`;

        sh.echo(name);
        sh.echo(func.arguments)

        const result = func();

        this.failIfNot0(result);

        return result;
    }

    private static failIfNot0(result: sh.ShellReturnValue) {
        // If any shelljs command fails,
        // fail the whole execution.
        if (result.code !== 0) {
            this.fail(result.code, result.stdout);
        }
    }

    private static fail(code: number, message: string) {
        sh.echo(message);
        sh.exit(code);
    }
}
