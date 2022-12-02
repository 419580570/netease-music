import { createApp } from "vue";
import { createPinia } from "pinia";
import ui from 'ui'
import App from "./App.vue";
import router from "./router";
import "./assets/css/index.scss";
import "ui/theme-chalk/index.scss"

const pinia = createPinia();

createApp(App).use(ui).use(pinia).use(router).mount("#app");
