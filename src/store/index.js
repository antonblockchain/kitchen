import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/auth";
import data from "@/store/data";
import options from "@/store/options";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  getters: {
    error: state => state.error
  },
  modules: { auth, data, options }
});
