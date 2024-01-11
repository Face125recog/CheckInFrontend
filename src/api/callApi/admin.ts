import {AbcHttpClient} from "../abcHttpClient.ts";

export interface AdminLogin {
    /**
     * 管理员用户名
     */
    name: string;
    /**
     * 管理员密码，明文传输
     */
    password: string;
}

export type AuthorizeToken = string

export async function adminLogin(client: AbcHttpClient, login: AdminLogin): Promise<AuthorizeToken> {
    const resp = await client.send<AuthorizeToken>({
        contentType: "application/json",
        method: "POST",
        path: "/admin/login",
        payload: login
    })
    return resp.data!
}