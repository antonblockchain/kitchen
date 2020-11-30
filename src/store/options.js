import axios from "axios";

export default {
  state: {
    optionsLoad: false,
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
      const id_table = "1DeEdfoquoLnBIczmX_6wg7bwwtFeQOPDHO-BMtAVDtg";
      // eslint-disable-next-line no-unused-vars
      const fetchInfo = (id, name) => {
        axios
          .get(
            `https://spreadsheets.google.com/feeds/cells/${id_table}/${id}/public/full?alt=json`
          )
          .then(res => {
            const { data } = res;
            const newArr = [];

            data.feed.entry.splice(2).forEach(item => {
              const cell = item["gs$cell"];
              if (cell["row"] > newArr.length + 1) {
                newArr.push({ name: cell["inputValue"] });
              }
              if (cell["col"] === "2") {
                newArr[newArr.length - 1].price = cell["inputValue"];
              }
            });
            console.log(newArr);
            commit("setOptionsByName", { name: name, data: newArr });
          })
          .catch(e => console.log(e));
      };

      try {
        // await new Promise(resolve => setTimeout(resolve, 1500));
        fetchInfo(2, "corps");
        fetchInfo(3, "facades");
        fetchInfo(4, "loops");
        fetchInfo(5, "boxes");
        fetchInfo(6, "mechanisms");
        fetchInfo(7, "tabletop");
        fetchInfo(8, "tabletop_psc");
        fetchInfo(9, "wall_panel");
        fetchInfo(10, "wall_panel_psc");
      } catch (e) {
        commit("setError", e);
        console.log(e);
        throw e;
      }
    },
    async fetchUserInfo() {}
  },
  getters: {
    getOptions: state => state.options
  }
};
