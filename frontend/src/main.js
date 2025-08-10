import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// Use environment variable for baseURL
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
console.log("API Base URL in Frontend:", axios.defaults.baseURL);

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')

