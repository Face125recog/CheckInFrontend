import { HttpRequest, Method, Payload } from "../httpRequest";

export class MockRequest extends HttpRequest {
    responseList: Record<string, object[]>;
    respIdx: Record<string, number> = {};

    send<T>(_: Method, path: string): Promise<Payload<T>> {
        const resp = this.responseList[path][this.respIdx[path]]
        this.respIdx[path] += 1;

        return new Promise((res) => { res({ data: resp as T }) })


    }
    constructor(resposeList: Record<string, object[]>) {
        super();
        this.responseList = resposeList
        for (const key in resposeList) {
            this.respIdx[key] = 0
        }
    }
}