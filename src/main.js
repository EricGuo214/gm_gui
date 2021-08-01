import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyA-18ljBNqTbrev7qwLdFj8qGUDNXg6Jmc",
  authDomain: "group-management-de.firebaseapp.com",
  projectId: "group-management-de",
  storageBucket: "group-management-de.appspot.com",
  messagingSenderId: "1032674877883",
  appId: "1:1032674877883:web:76e48674b7ba3388c3e49e"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
