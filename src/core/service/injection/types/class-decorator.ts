import { IConstructor } from './i-constructor';
export type ClassDecorator<T extends Function> = (Target: IConstructor<T>) => T | void;
