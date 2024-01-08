import {AbcHttpClient} from "../../abcHttpClient.ts";
import {AuthorizeToken} from "../admin.ts";

export async function userCount(client: AbcHttpClient, authorize: AuthorizeToken): Promise<number> {
    const resp = await client.send<number>({
        contentType: "text/plain", method: "GET", path: "/user/all/count", authorize
    })
    return resp.data
}