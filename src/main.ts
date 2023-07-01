import { createApp } from "vue";
import pinia from "./stores";

import App from "./App.vue";
import router from "./router";
import "./styles/index.scss";
import ElSvg from "./components/SvgIcon/ElSvg";
import "./permission";

const app = createApp(App);

ElSvg(app);

app.use(pinia).use(router).mount("#app");
