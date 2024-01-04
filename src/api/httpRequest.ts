export type Method = "GET" | "POST" | "HEAD"
export type ContentType = "application/json" | "multipart/form-data" | "application/x-www-form-urlencoded"

export interface Payload<T> {
    data?: T,
    errmsg?: string,
    errty?: string
}

export abstract class HttpRequest {
    abstract send<T>(
        method: Method,
        path: string,
        contentType: ContentType,
        query?: Record<string, string>,
        payload?: Blob | object,
        authorize?: string): Promise<Payload<T>>;
}