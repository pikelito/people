import { createApp } from 'vue';
import { Quasar } from 'quasar';
import App from './App.vue';
import router from './router';
import pinia from './stores';

import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';

import './scss/main.scss';

const app = createApp(App);

app.use(router);
app.use(pinia);

app.use(Quasar, {
  plugins: {},
  config: {
    brand: {
      primary: '#42b883',
      secondary: '#35495e',
      accent: '#9C27B0',
      dark: '#1d1d1d',
      positive: '#21BA45',
      negative: '#C10015',
      info: '#31CCEC',
      warning: '#F2C037',
    },
  },
});

app.mount('#app');
