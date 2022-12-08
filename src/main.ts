import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import "normalize.css";
import "@/assets/scss/init.scss";

import { globalRegister } from "@/global";

const app = createApp(App);

app.use(router).use(globalRegister);

app.mount("#app");
