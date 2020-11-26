import {Injectable} from "../../core/decorator/injection/injection";
import {ServiceTest} from "../service/service-test";
import {Controller, Get} from "../../core/decorator/routing/routing";
import {ConfigClass} from "../../core/config/config-class";
import {AbstractController} from "../../core/classes/controller/abstract-controller";
import {BadRequest, NotFound} from "../../core/responses/response";

@Injectable()
@Controller('/test')
export class MainController extends AbstractController {
  constructor(private service: ServiceTest) {
      super();
  }
  @Get('/')
  public init(): void {
      let config: ConfigClass = ConfigClass.getInstance();
      new NotFound();
  

    // this.serviceTest.test2();

  }
  @Get('/test')
  public test(): void {
        this.service.test();
        let config: ConfigClass = ConfigClass.getInstance();
        new BadRequest();


  }
  @Get('/dupa')
  public dupa(): void {
  }
}
