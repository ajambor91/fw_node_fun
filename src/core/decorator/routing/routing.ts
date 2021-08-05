import {IMethods} from './types/i-methods';


export const Controller = (prefix: string = ''): ClassDecorator => {
    return (target: any) => {
       const args = Reflect.getMetadata('design:paramtypes', target) || [];
       // const resArgs = args.map((param: any) => {})
        Reflect.defineMetadata('prefix', prefix, target);
        if (! Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target);
        }
    };
};


export const Get = (path: string): MethodDecorator => {
    return (target, propertyKey: string): void => {

        if (! Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }
        const routes = Reflect.getMetadata('routes', target.constructor) as Array<IMethods>;

        routes.push({
            requestMethod: 'get',
            path,
            methodName: propertyKey
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
};


// export const Routing = function () {
//     return true;
// }
export const get = (val: any) => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {

};

