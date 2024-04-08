import { createMemoryHistory, createRouter } from "vue-router";

import GetStarted from "./components/GetStarted.vue";
import LogIn from "./components/LogIn.vue";
import Messages from "./components/Messages.vue";

const routes = [
  { path: "/", component: Messages },
  { path: "/login", component: LogIn },
  { path: "/signup", component: GetStarted },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
