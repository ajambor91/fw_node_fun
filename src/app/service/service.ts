import { Injectable } from "./../../core/service/dependency-injection/injectable";

@Injectable()
export class Service {
  constructor(){}
  public test() {
    console.log('service');
  }
}