import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/styles/main.css';
import 'vue3-toastify/dist/index.css';

import App from './App.vue';
import router from './router';
import { validation } from './plugins/validation';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(validation);

app.mount('#app');
