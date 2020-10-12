import path from "path";

export class ConfigClass {
    private static instance: ConfigClass;
    private path: string;
    private constructor() {
    }

    static getInstance(): ConfigClass {
        if(!ConfigClass.instance){
            ConfigClass.instance = new ConfigClass();
        }
        return ConfigClass.instance;
    }

    private setDirPath(): void {
        this.path = path;
    }
}