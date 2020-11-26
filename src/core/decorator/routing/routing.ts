import {IMethods} from './types/i-methods';


export const Controller = (prefix: string = ''): ClassDecorator => {
    return (target: any) => {
       const args = Reflect.getMetadata('design:paramtypes', target) || [];
       // const resArgs = args.map((param: any) => {})
        Reflect.defineMetadata('prefix', prefix, target);
        // Since routes are set by our methods this should almost never be true (except the controller has no methods)
        if (! Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target);
        }
    };
};


export const Get = (path: string): MethodDecorator => {
    // `target` equals our class, `propertyKey` equals our decorated method name
    return (target, propertyKey: string): void => {
        // In case this is the first route to be registered the `routes` metadata is likely to be undefined at this point.
        // To prevent any further validation simply set it to an empty array here.
        if (! Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }

        // Get the routes stored so far, extend it by the new route and re-set the metadata.
        const routes = Reflect.getMetadata('routes', target.constructor) as Array<IMethods>;

        routes.push({
            requestMethod: 'get',
            path,
            methodName: propertyKey
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
};


export const Routing = function () {
    return true;
}
export const get = (val: any) => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {

};

