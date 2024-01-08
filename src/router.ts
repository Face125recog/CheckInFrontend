import {createRouter, createWebHistory} from "vue-router"
import CheckInPage from "./pages/CheckInPage.vue"
import UserManagerPage from "./pages/UserManagerPage.vue"
import Home from "./pages/Home.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Home
        },
        {
            path: "/check_in",
            component: CheckInPage
        },
        {
            path: "/admin",
            component: UserManagerPage
        }
    ]
})

export default router