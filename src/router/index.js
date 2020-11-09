import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Page from "../views/Page";
import firebase from "firebase/app";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      if (firebase.auth().currentUser) {
        next("/page");
      } else {
        next();
      }
    }
  },
  {
    path: "/page",
    name: "Page",
    component: Page,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuth = firebase.auth().currentUser;
  console.log(requiresAuth, !!isAuth);

  if (requiresAuth && !isAuth) {
    next("/");
  } else {
    next();
  }
});

export default router;
