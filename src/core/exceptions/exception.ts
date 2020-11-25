export class Exception{
    private _message: string;
    constructor(message: string) {
        this._message = message;
        this.initError();
    }
    initError(): void {
        console.log("\x1b[31m",this._message);
        process.exit();
    }
}