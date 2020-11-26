export class Critical{
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
//TODO dodać dziedziczenie po Error