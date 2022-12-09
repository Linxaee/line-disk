import { createApp } from "vue";

import App from "./App.vue";
import router from "@/router";

import { createPinia } from "pinia";

import "normalize.css";
import "@/assets/scss/init.scss";

import { globalRegister } from "@/global";

const app = createApp(App);

app.use(router).use(createPinia()).use(globalRegister);

app.mount("#app");
