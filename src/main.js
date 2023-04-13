import { createApp, markRaw } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './Router'
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

const pinia = createPinia()
const app = createApp(App)
app.use(router)
// app.component("font-awesome-icon", FontAwesomeIcon)
app.use(pinia);
app.mount('#app');
