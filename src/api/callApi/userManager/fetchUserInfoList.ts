import {AbcHttpClient} from "../../abcHttpClient.ts";
import {UserInfo} from "../checkIn.ts";
import {AuthorizeToken} from "../admin.ts";

export async function fetchUserInfoList(client: AbcHttpClient, pageSize: number, page: number, authorize: AuthorizeToken): Promise<UserInfo[]> {
    const resp = await client.send<UserInfo[]>({
        path: "/user/all",
        contentType: "application/json",
        method: "GET",
        query: {
            "pageSize": pageSize.toString(10), "page": page.toString(10)
        }, authorize
    })
    return resp.data
}