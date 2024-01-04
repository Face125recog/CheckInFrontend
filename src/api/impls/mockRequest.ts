import { ContentType, HttpRequest, Method, Payload } from "../httpRequest";

export class MockRequest extends HttpRequest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    send<T>(_method: Method, path: string, _contentType: ContentType): Promise<Payload<T>> {
        const resp = this.responseList[path][this.respIdx[path]]
        this.respIdx[path] += 1;

        return new Promise((res) => { res({ data: resp as T }) })


    }
    responseList: Record<string, object[]>;
    respIdx: Record<string, number> = {};


    constructor(resposeList: Record<string, object[]>) {
        super();
        this.responseList = resposeList
        for (const key in resposeList) {
            this.respIdx[key] = 0
        }
    }
}