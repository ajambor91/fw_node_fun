import { Routes } from './router/routes';
import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { Injector, Injectable } from './decorator/injection/injection';
import { MainController } from './../app/controller/main-controller';
import 'reflect-metadata';
import {IMethods} from "./decorator/routing/types/i-methods";
import {IConstructor} from "./decorator/injection/types/i-constructor";
import {IObject} from "./decorator/routing/types/i-object";
import {ConfigClass} from "./config/config-class";
import path from "path";
import * as fs from "fs";
import {AbstractController} from "./classes/controller/abstract-controller";
import {Exception} from "./exceptions/exception";

    // tslint:disable-next-line:no-console
class App {
    private i = 0;
    private server: Server;
    private readonly port: number = 1200;
    // private readonly routes: Routes = new Routes();
    private readonly domain: string = 'http://localhost';

    private _config: ConfigClass;
    private _controllers: IConstructor<any>[] = [];
    private _controllersPath: string;

    constructor() {
        this.initApplication();
    }

    private initApplication(): void {
        // this.app.use('/', this.routes.router)
        // this.app.listen( this.port, (): void => {
        //     console.log( `server started at ${ this.domain }:${ this.port }` );
        // });

        this.prepareApp();
        this.startServer();
        this.serverListen();
        // this.mainController.service.test();
        this.i++

    }

    private prepareApp(): void {
        this.initializeConfig();
        this.checkControllersPath();
        this.loadControllers();
        this.checkControllers();
    }

    private checkControllers(): void {
        this._controllers.forEach((item: IConstructor<any>) => {
            if (!(item.prototype instanceof AbstractController)) {
                new Exception('Controllers not extend AbstractController');
            }
        });
    }

    private startServer(): void {
        this.server = createServer((request: IncomingMessage, response: ServerResponse) => {
            this._controllers.forEach((item: IConstructor<any>) => {
                const routes: Array<IMethods> = Reflect.getMetadata('routes', item);
                const instance = Injector.resolve(item);
                routes.forEach( route => {
                    this.runMethod(route, request, instance, response );
                })
            })
          });
    }

    private serverListen(): void {
        this.server.listen(this.port, () => {
            console.log('Server listening');
        });
    }

    private runMethod(route: IMethods, url: IncomingMessage, classParameter: any, res: ServerResponse) : () => any {
        if (url.url === route.path) {
            console.log('injdkhfjkdhfkjdhfkjdhfk')
            return  classParameter[route.methodName](res);

        } else if(url.url !== route.path){
            res.statusCode = 500;
            res.statusMessage = 'Not found';

        }
        else if(url.url === route.path && url.method.toLocaleLowerCase() !== route.requestMethod){
            res.statusCode = 400;
            res.statusMessage = 'Bad method'
        }
    }

    private getRequiredDependencies(classParameter: IConstructor<any>): IConstructor<any>[] {
        const requiredParams = Reflect.getMetadata('design:paramtypes', classParameter) || [];
        const resolvedParams = requiredParams.map( (item: IConstructor<any>) => this.getRequiredDependencies(item));
        this.i++;
        return new classParameter(...resolvedParams);
    }

    private initializeConfig(): void {
        this._config = ConfigClass.getInstance();
        this._config.path = `${path.resolve(__dirname).replace('core','')}app`;
        this._config.config = JSON.parse(fs.readFileSync(`${this._config.path}/config/config.json`, 'utf-8'));
        this._controllersPath =  this._config.config.appStructure.controllers;
    }

    private loadControllers(): void {
        fs.readdirSync(`${this._config.path}/${this._controllersPath}`)
            .forEach((item: string) => {
                let classInstance = require(`${this._config.path}/${this._controllersPath}/${item}`);
                for(let i in classInstance) {
                    this._controllers.push(classInstance[i]);
                }
            });
    }

    private checkControllersPath(): void {
        if (!fs.existsSync(`${this._config.path}/${this._controllersPath}/`)) {
            new Exception('Controllers path doesn\'t exist');
        }
    }
}

export const app = new App();
