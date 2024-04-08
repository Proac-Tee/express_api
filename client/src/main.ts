import { createApp } from "vue";
import App from "./App.vue";
import store from "./index"; // Import your Vuex store
import "./style.css";
import router from "./router";

const app = createApp(App);
app.use(store); // Use the Vuex store
app.use(router);
app.mount("#app");
