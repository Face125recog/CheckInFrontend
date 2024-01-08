export type Method = "GET" | "POST" | "HEAD"
export type ContentType =
    "application/json"
    | "multipart/form-data"
    | "application/x-www-form-urlencoded"
    | "text/plain"

export interface Payload<T> {
    data?: T,
    errmsg?: string,
    errty?: string
}

export interface SendPayload {
    method: Method,
    path: string,
    contentType: ContentType,
    query?: Record<string, string>,
    payload?: Blob | object,
    authorize?: string
}

export abstract class AbcHttpClient {
    abstract send<T>(
        payload: SendPayload): Promise<Payload<T>>;
}