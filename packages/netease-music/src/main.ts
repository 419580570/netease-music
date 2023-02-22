import { createApp } from "vue";
import { createPinia } from "pinia";
import ui from "ui";
import App from "./App.vue";
import router from "./router";
import "./assets/css/index.scss";
import "ui/lib/style.css";

const pinia = createPinia();

// const NPlayer = new createPlayer();
// console.log(NPlayer);

createApp(App).use(ui).use(pinia).use(router).mount("#app");
