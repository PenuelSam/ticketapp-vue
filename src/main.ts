import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './styles/tokens.css'

createApp(App)
  .use(router)
  .use(createPinia())
  .use(Toast, { position: 'top-center' })
  .mount('#app')
