import path from "path";

export class ConfigClass {
    set path(path: string) {
        this._path = path;
    }

    get path(): string {
        return this._path;
    }

    set config(config: any) {
        this._config = config;
    }
    get config(): any {
        return this._config;
    }

    private static instance: ConfigClass;
    private _path: string;
    private _config: any;

    private constructor() {}

    static getInstance(): ConfigClass {
        if(!ConfigClass.instance){
            ConfigClass.instance = new ConfigClass();
        }
        return ConfigClass.instance;
    }
}