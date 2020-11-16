export default {
  install(Vue) {
    Vue.prototype.$message = function(text) {
      Vue.$toast.info(text);
    };
    Vue.prototype.$error = function(text) {
      Vue.$toast.error(text);
    };
  }
};
