import express, { RequestHandler } from 'express';

export class Routes {

  get router(): any {
    return this._router;
  }

  private readonly _router = express.Router()
  private readonly routes = {
    index: {
      path: '/',
      method: '/get'
    },
    test: {
      path: '/test',
      children: {
        path: '/dupa',
        method: 'get'
      }
    }
  }   

  constructor(){
    this.initializeRoutes()
  }
  
  private initializeRoutes(): void {
    // this.index();
    // this.test();

    // this.router[this.routes.index.method](this.routes.index.path, (req: RequestHandler, res: any) => {
    //   res.send('indes');
    // })

    let test = this.routes.index.method;
    
    var name = "foo";
    var dypa = new String('dsads');
    var func = new Function(
      "return this.router " + this.routes.index.method + "(this.routes.index.path, (req res) => { res.send('indes')};")();

//call it, to test it
    func();
  }
  //get
  private index(): void {
    this.router.get('/', (req: RequestHandler, res: any) => {
      res.send('indes');
    });
  }
  //get
  private test(): void {
    const controllerPath = '/test/'
    this.router.get(`${controllerPath}dupa`, (req: RequestHandler, res: any) => {
      res.send('chuj')
    });
  }
}