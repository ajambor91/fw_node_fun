import { Routes } from './router/routes';
import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { Injector, Injectable } from './decorator/injection/injection';
import { MainController } from './../app/controller/main-controller';
import 'reflect-metadata';
import {IMethods} from "./decorator/routing/types/i-methods";
import {IConstructor} from "./decorator/injection/types/i-constructor";
import {IObject} from "./decorator/routing/types/i-object";

    // tslint:disable-next-line:no-console
class App {
    private i = 0;
    private server: Server;
    private readonly port: number = 1200;
    // private readonly routes: Routes = new Routes();
    private readonly domain: string = 'http://localhost'; 
    
    constructor() {
        this.initApplication();
    }

    private initApplication(): void {
        // this.app.use('/', this.routes.router)
        // this.app.listen( this.port, (): void => {
        //     console.log( `server started at ${ this.domain }:${ this.port }` );
        // });
        this.startServer();
        this.serverListen();
        console.log('main', this.i);
        // this.mainController.service.test();
        this.i++

    }
    
    private startServer(): void {
        console.log('wat?')
        this.server = createServer((request: IncomingMessage, response: ServerResponse) => {
            console.log('blabla');
            [MainController].forEach((item: IConstructor<any>) => {
                // const instance = this.getRequiredDependencies(item);
                const prefix = Reflect.getMetadata('prefix', item);
                const routes: Array<IMethods> = Reflect.getMetadata('routes', item);
                const instance = Injector.resolve(item);
                console.log(instance,'index')
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
        console.log(url.url, '  route',route.path)
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

}

export const app = new App();
