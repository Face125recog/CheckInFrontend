import axios, { AxiosHeaders, AxiosInstance } from "axios"
import { ContentType, HttpRequest, Method, Payload } from "../httpRequest"

const BASE_URL = "http://192.168.1.121"

export class AxiosRequest extends HttpRequest {
    async send<T>(method: Method, path: string, contentType: ContentType, query?: Record<string, string> | undefined, payload?: object | Blob | undefined, authorize?: string): Promise<Payload<T>> {
        const headers = new AxiosHeaders()

        headers.setContentType(contentType)
        if (authorize) {
            headers.setAuthorization(authorize)
        }

        const resp = await this.instance.request<Payload<T>>({
            url: path,
            method: method,
            params: query,
            data: payload,
            headers: headers
        }).catch((err) => {
            throw new Error(`Axios Request Error: ${err}`)
        });

        if (resp.status < 300) {
            return resp.data
        } else {
            throw new Error(`Request Failure: ${resp.status} ${resp.statusText} | ${resp.data.errty} ${resp.data.errmsg}`)
        }
    }
    instance: AxiosInstance

    constructor() {
        super()
        this.instance = axios.create({
            baseURL: BASE_URL,
            timeout: 1500,
        })
    }
}