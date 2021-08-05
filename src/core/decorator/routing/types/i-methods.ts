export interface IMethods {
    path: string;
    requestMethod: 'get' | 'post' | 'delete' | 'options' | 'put';
    methodName: string;
}