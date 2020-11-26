import {IncomingMessage} from "http";
import {ArrayHelper} from "./array-helper";

export class RouterHelper{
    static returnControllerPathUrl(url: IncomingMessage): string {
        return this.returnArrayRoutes(url)[0];
    }

    static returnMethodUrl(url: IncomingMessage): string {
        return this.returnArrayRoutes(url)[1] ?? '';
    }

    private static returnArrayRoutes(url: IncomingMessage): string[] {
        let arr = url.url.split('/');
        return  ArrayHelper.removeEmptyArrayIndexes(arr);
    }
}