export default {
  // eslint-disable-next-line no-unused-vars
  install(Vue, options) {
    Vue.prototype.$message = function(text) {
      Vue.$toast.info(text);
    };
    Vue.prototype.$error = function(text) {
      Vue.$toast.error(text);
    };
  }
};
