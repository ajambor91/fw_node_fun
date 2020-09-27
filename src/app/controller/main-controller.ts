import { Injectable, Injector } from "./../../core/service/dependency-injection/injectable";
import { Service } from "../service/service";

@Injectable()
export class MainController {
  dupa: string;
  constructor(public service: Service) {
        this.init();
  }
  public init(): void {
    console.log('main init?');
    this.service.test();
  }
}
