import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "./store";
import dotenv from "dotenv";

dotenv.config();

axios.defaults.baseURL = process.env.VUE_APP_API;

createApp(App)
  .use(store)
  .use(router, axios)
  .mount("#app");
