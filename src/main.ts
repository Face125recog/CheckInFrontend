import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "vuetify/styles"
import {createVuetify} from "vuetify";
import {components, directives} from "vuetify/dist/vuetify";

const vuetify= createVuetify({components,directives})
createApp(App)
    .use(vuetify)
    .mount('#app')
