import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home"),
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
    component: () => import("../views/Page"),
    meta: { requiresAuth: true }
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("../views/Main"),
    meta: { requiresAuth: true }
  },
  {
    path: "/order",
    name: "Order",
    component: () => import("../views/Order"),
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

  if (requiresAuth && !isAuth) {
    next("/");
  } else {
    next();
  }
});

export default router;
