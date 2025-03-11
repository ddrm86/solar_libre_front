import './style.css';
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice';
import Aura from '@primevue/themes/aura';
import { createI18n } from 'vue-i18n'

const app = createApp(App)

app.use(createPinia())
app.use(createI18n({  locale: navigator.language, fallbackLocale: 'en' }))
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});
app.use(DialogService);
app.use(ToastService);

app.mount('#app')
