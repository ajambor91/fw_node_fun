import 'reflect-metadata';
import {ClassDecorator} from './types/class-decorator'
import { IConstructor } from './types/i-constructor';

export const Injector = new class {
  resolve<T>(Target: IConstructor<T>): T {
    const requiredParams = Reflect.getMetadata('design:paramtypes', Target) || [];
    const resolvedParams = requiredParams.map((param: any) => Injector.resolve(param));
    const instance = new Target(...resolvedParams);
    return instance;
  }
}();

export const Injectable = (): ClassDecorator<any> => (target: any) => {console.log(target,'tarhet')};