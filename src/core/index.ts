import { Routes } from './router/routes';
import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { Injector, Injectable } from './service/dependency-injection/injectable';
import { MainController } from './../app/controller/main-controller';
import 'reflect-metadata';
    // tslint:disable-next-line:no-console
    // dependecny injection
    @Injectable()
class App {
    
    private server: Server;
    private readonly port: number = 1200;
    // private readonly routes: Routes = new Routes();
    private readonly domain: string = 'http://localhost'; 
    
    constructor(private mainController: MainController) {
        this.initApplication();
    }

    private initApplication(): void {
        // this.app.use('/', this.routes.router)
        // this.app.listen( this.port, (): void => {
        //     console.log( `server started at ${ this.domain }:${ this.port }` );
        // });
        this.startServer();
        this.serverListen();

    }
    
    private startServer(): void {
        this.server = createServer((request: IncomingMessage, response: ServerResponse) => {
            // test.service.test();
            // response.end(this.mainController.init());
          });
    }

    private serverListen(): void{
        this.server.listen(this.port, () => {
            console.log('Server listening');
        });
    }

}

const test = Injector.resolve(App);
