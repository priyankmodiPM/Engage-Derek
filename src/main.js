import Vue from 'vue'
import Vuetify from 'vuetify';

import App from './App';
import router from './router';
import store from './store';
import './auth';

import('vuetify/dist/vuetify.css');

Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  vuetify: new Vuetify(),
});