import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'
import Aura from '@primevue/themes/aura'
import { createI18n } from 'vue-i18n'

const app = createApp(App)

app.use(createPinia())
app.use(
  createI18n({
    locale: navigator.language.split('-')[0],
    fallbackLocale: 'en',
    messages: { es: {}, en: {} }, // availableLocales shows just the navigation language if it is not initialized
  }),
)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(DialogService)
app.use(ToastService)

app.mount('#app')
