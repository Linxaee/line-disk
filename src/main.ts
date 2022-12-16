import { createApp } from "vue";

import App from "./App.vue";
import router from "@/router";

import { pinia } from "@/store";

import "normalize.css";
import "@/assets/scss/init.scss";

import { globalRegister } from "@/global";

const app = createApp(App);

app.use(router).use(pinia).use(globalRegister);

app.mount("#app");
