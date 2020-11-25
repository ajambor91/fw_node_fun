import { Injectable } from "../../core/decorator/injection/injection";
import { Service } from "../service/service";
import { ServiceTest } from "../service/service-test";
import {Controller, Get, get} from "../../core/decorator/routing/routing";
import {ServerResponse} from "http";
import {ConfigClass} from "../../core/config/config-class";
import {AbstractController} from "../../core/classes/controller/abstract-controller";

@Injectable()
@Controller('/test')
export class MainController extends AbstractController {
  i = 0;
  constructor(private service: ServiceTest) {
      super();
      this.init();
  }
  @Get('/')
  public init(): void {
    console.log('main init?', this.i);
    this.i++;
  
  

    // this.serviceTest.test2();

  }
  @Get('/test')
  public test(res: ServerResponse): void {
        this.service.test();
        console.log(res)
        let config: ConfigClass = ConfigClass.getInstance();

        res.write('chuj' + config.path);
        res.end();

  }
  @Get('/dupa')
  public dupa(): void {
    console.log('dupa tez odpalila')
  }
}
