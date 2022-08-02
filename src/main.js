import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'
import './assets/style/global/reset.less'
import './assets/style/global/global.less'
createApp(App).use(store).use(router).use(TDesign).mount('#app')
