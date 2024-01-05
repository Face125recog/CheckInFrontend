import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "vuetify/styles"
import { createVuetify } from "vuetify";
import { components, directives } from "vuetify/dist/vuetify";
import router from './router';

const vuetify = createVuetify({ components, directives })
createApp(App)
    .use(vuetify)
    .use(router)
    .mount('#app')
