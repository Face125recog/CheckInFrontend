import {AdminLogin, adminLogin, AuthorizeToken} from "./api/callApi/admin.ts";
import {AbcHttpClient} from "./api/abcHttpClient.ts";
import {AxiosRequest} from "./api/impls/axiosRequest.ts";
import {ref} from "vue";

const key = "AuthorizeToken";

export class Authorize {
    static authorizeToken = ref<AuthorizeToken | null>(null)

    public static async getAuthorizeToken(onNeedLogin: () => Promise<AdminLogin>, client: AbcHttpClient = AxiosRequest.getInstance()) {
        if (Authorize.authorizeToken.value) {
            return Authorize.authorizeToken.value
        } else if (localStorage.getItem(key)) {
            Authorize.authorizeToken.value = localStorage.getItem(key)!
            return Authorize.authorizeToken.value
        } else {
            Authorize.authorizeToken.value = await adminLogin(client, await onNeedLogin())
            localStorage.setItem(key, Authorize.authorizeToken.value)
            return Authorize.authorizeToken.value
        }
    }

    public static authorized(): boolean {
        return (Authorize.authorizeToken.value == null)
    }

    public static removeAuthorize() {
        localStorage.removeItem(key)
        Authorize.authorizeToken.value = null
    }

    public static init() {
        if (Authorize.authorizeToken.value) {
            return Authorize.authorizeToken
        } else {
            const item = localStorage.getItem(key)
            if (item)
                Authorize.authorizeToken.value = item
            return Authorize.authorizeToken
        }
    }

}