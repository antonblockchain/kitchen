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
          { name: "a", type: 2, price: 100 },
          { name: "Brilliant", type: 5, price: 400 },
          { name: "b", type: 3, price: 200 },
          { name: "c", type: 4, price: 300 }
        ];
        commit("setOptionsByName", { name: "corps", data });
        commit("setOptionsByName", { name: "facades", data });
        commit("setOptionsByName", { name: "loops", data });
        commit("setOptionsByName", { name: "boxes", data });
        commit("setOptionsByName", { name: "mechanisms", data });
        commit("setOptionsByName", { name: "tabletop", data });
        commit("setOptionsByName", { name: "tabletop_psc", data });
        commit("setOptionsByName", { name: "wall_panel", data });
        commit("setOptionsByName", { name: "wall_panel_psc", data });
        commit("setOptionsByName", { name: "handles", data });
        commit("setOptionsByName", { name: "other", data });
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
