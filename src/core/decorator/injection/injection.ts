import 'reflect-metadata';
import {ClassDecorator} from './types/class-decorator'
import { IConstructor } from './types/i-constructor';

export const Injector = new class {
  i = 0;
  resolve<T>(Target: IConstructor<T>): T {
    const requiredParams = Reflect.getMetadata('design:paramtypes', Target) || [];
    const resolvedParams = requiredParams.map((param: any) => Injector.resolve(param));
    // console.log(resolvedParams, 'resolved params')
    const instance = new Target(...resolvedParams);
    // console.log(instance,'instance')
    console.log('injector', this.i);
    this.i++;
    return instance;
  }
}();

export const Injectable = (): ClassDecorator<any> => (target: any) => {console.log(target,'tarhet')};