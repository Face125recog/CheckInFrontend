import {AuthorizeToken} from "../api/callApi/admin.ts";

export interface User {
    name: string,
    identity: number
}

export abstract class AbcUserManager {
    abstract userNumber(authorize: AuthorizeToken): Promise<number>

    abstract allUser(authorize: AuthorizeToken, pageSize: number, page: number): Promise<User[]>

    abstract removeUser(identity: number, authorize: AuthorizeToken): Promise<void>
}