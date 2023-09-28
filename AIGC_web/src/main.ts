import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import router from './router'
// import store from './store/index'
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'

const VueApp = createApp(App)

VueApp.use(router)
// VueApp.use(store)
VueApp.use(TDesign)
VueApp.mount('#app')
