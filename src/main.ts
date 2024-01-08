import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import "vuetify/styles"
import vuetify from "./plugins/vutify.ts";
import router from './router';

const app = createApp(App)


app.use(vuetify)
app.use(router)
app.mount('#app')
