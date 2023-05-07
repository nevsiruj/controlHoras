const { createApp } = require('vue');
import App from './App.vue';
import router from './router'; // <---
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import './firebase.js';

createApp(App).use(router).mount('#app');
