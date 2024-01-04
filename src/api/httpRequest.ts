export type Method = "GET" | "POST" | "HEAD" 

export interface Payload<T>{
    data?:T,
    errmsg?:string,
    errty?:string
}

export abstract class HttpRequest{
    abstract  send<T>(method:Method, path:string, query?:Record<string,string>,payload?:Blob|object):Promise<Payload<T>>;
}