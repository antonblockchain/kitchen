import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import messagePlugin from "@/utils/message.plugin";
import VueTheMask from "vue-the-mask";
import vSelect from "vue-select";
import VueInputAutoWidth from "vue-input-autowidth";
import onlyInt from "vue-input-only-number";
import { Plugin } from "vue-fragment";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

firebase.initializeApp({
  apiKey: "AIzaSyDuPlteafFUVjCKSsXc8Q5cwh3Lf3ITibA",
  authDomain: "kitchen-calc-724d4.firebaseapp.com",
  databaseURL: "https://kitchen-calc-724d4.firebaseio.com",
  projectId: "kitchen-calc-724d4",
  storageBucket: "kitchen-calc-724d4.appspot.com",
  messagingSenderId: "289012992567",
  appId: "1:289012992567:web:f97c6109e9bbc1a4450db2",
  measurementId: "G-K1QVP1501V"
});

let app;

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");

    Vue.use(VueToast);
    Vue.use(messagePlugin);
    Vue.use(VueTheMask);
    Vue.use(VueInputAutoWidth);
    Vue.use(onlyInt);
    Vue.use(Plugin);

    vSelect.props.components.default = () => ({
      OpenIndicator: {
        render: createElement =>
          createElement("span", {
            class: "icon icon-down"
          })
      }
    });
    Vue.component("v-select", vSelect);
  }
});
