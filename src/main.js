import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from "axios";

axios.defaults.baseURL = 'https://igor-the-loop.herokuapp.com'

createApp(App).use(store).use(router, axios).mount('#app')
