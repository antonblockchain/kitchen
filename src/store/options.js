export default {
  state: {
    options: {
      corps: [],
      facades: [],
      loops: [],
      boxes: [],
      mechanisms: [],
      tabletop: [],
      "tabletop-psc": [],
      "wall-panel": [],
      "wall-panel-psc": [],
      handles: [],
      other: []
    }
  },
  mutations: {
    setOptionsByName(state, { name, data }) {
      state.options[name] = data;
    }
  },
  actions: {
    async fetchOptions({ commit }) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const data = [
          { name: "a", type: 2 },
          { name: "b", type: 3 },
          { name: "c", type: 4 },
          { name: "Brilliant", type: 5 }
        ];
        const name = "corps";
        commit("setOptionsByName", { name, data });
      } catch (e) {
        commit("setError", e);
        console.log(e);
        throw e;
      }
    }
  },
  getters: {
    getOptions: state => state.options
  }
};
