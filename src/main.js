import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue3-cookies'

createApp(App).use(createPinia())
    .use(router)
    .use(VueCookies)
    .mount('#app')