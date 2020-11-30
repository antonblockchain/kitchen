export default {
  state: {
    options: {
      corps: [],
      facades: [],
      loops: [],
      boxes: [],
      mechanisms: [],
      tabletop: [],
      tabletop_psc: [],
      wall_panel: [],
      wall_panel_psc: []
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
          { name: "А", price: 100 },
          { name: "Brilliant", price: 400 },
          { name: "b", price: 200 },
          { name: "c", price: 300 }
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
