import { createWebHistory, createRouter } from "vue-router"
import CheckInPage from "./pages/CheckInPage.vue"
import UserManagerPage from "./pages/UserManagerPage.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
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