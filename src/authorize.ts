import {AdminLogin, adminLogin, AuthorizeToken} from "./api/callApi/admin.ts";
import {AbcHttpClient} from "./api/abcHttpClient.ts";
import {AxiosRequest} from "./api/impls/axiosRequest.ts";

const key = "AuthorizeToken";

export class Authorize {
    static authorizeToken?: AuthorizeToken

    public static async getAuthorizeToken(onNeedLogin: () => Promise<AdminLogin>, client: AbcHttpClient = AxiosRequest.getInstance()) {
        if (this.authorizeToken) {
            return this.authorizeToken
        } else if (localStorage.getItem(key)) {
            this.authorizeToken = localStorage.getItem(key)!
            return this.authorizeToken
        } else {
            this.authorizeToken = await adminLogin(client, await onNeedLogin())
            localStorage.setItem(key, this.authorizeToken)
            return this.authorizeToken
        }
    }

    public static init() {
        if (this.authorizeToken) {
            return this.authorizeToken
        } else {
            const item = localStorage.getItem(key)
            if (item)
                this.authorizeToken = item
            return item
        }
    }

}