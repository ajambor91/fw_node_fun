import {ServerResponse} from "http";

export enum StatusCodes{
    Ok = 200,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed= 405,
    InternalServerError= 500
}

export class ResponseContainer{
    public static serverResponse: ServerResponse;
}

export abstract class Response {
    private readonly _message: string;
    private readonly _isJSON: boolean;
    private readonly _statusCode: StatusCodes;

    protected constructor(statusCode: StatusCodes, message?: string, isJSON: boolean = true) {
        this._message = message;
        this._isJSON = isJSON;
        this._statusCode = statusCode;
        this.sendError();
    }

    private sendError(): void {
        const headers = {
            'Content-Type': this._isJSON ?  'text/json' :  'text/plain'
        };

        ResponseContainer.serverResponse.writeHead(this._statusCode, headers);
        ResponseContainer.serverResponse.end(
            this._isJSON ===true ? JSON.stringify({data: this._message}) : this._message
        );
    }
}
export class Ok extends Response{
    constructor(message?: string, isJSON: boolean = true) {
        super( StatusCodes.Ok, message, isJSON);
    }
}

export class NotFound extends Response{
    constructor(message?: string, isJSON: boolean = true) {
        super( StatusCodes.NotFound, message, isJSON);
    }
}

export class BadRequest extends Response{
    constructor(message?: string, isJSON: boolean = true) {
        super(StatusCodes.BadRequest, message, isJSON);
    }
}

export class Unauthorized extends Response{
    constructor(message?: string, isJSON: boolean = true) {
        super(StatusCodes.Unauthorized, message, isJSON);
    }
}

export class Forbidden extends Response{
    constructor(message?: string, isJSON: boolean = true) {
        super(StatusCodes.Forbidden, message, isJSON);
    }
}

export class MethodNotAllowed extends Response{
    constructor(message?: string, isJSON: boolean = true) {
        super(StatusCodes.MethodNotAllowed, message, isJSON);
    }
}

export class InternalServerError extends Response{
    constructor(message?: string, isJSON: boolean = true) {
        super(StatusCodes.InternalServerError, message, isJSON);
    }
}