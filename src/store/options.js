import axios from "axios";

export default {
  state: {
    user: {
      name: "",
      position: "",
      phone: "",
      email: "",
      url: ""
    },
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
    },
    setUser(state, data) {
      data.some(item => {
        if (item.email === state.user.email) {
          state.user = { ...item };
          return true;
        }
        return false;
      });
    }
  },
  actions: {
    async fetchOptions({ commit }) {
      const id_table = "1DeEdfoquoLnBIczmX_6wg7bwwtFeQOPDHO-BMtAVDtg";
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
            commit("setOptionsByName", { name: name, data: newArr });
          })
          .catch(e => console.log(e));
      };

      try {
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
    async fetchUserInfo({ commit }) {
      const id = "1DeEdfoquoLnBIczmX_6wg7bwwtFeQOPDHO-BMtAVDtg";
      axios
        .get(
          `https://spreadsheets.google.com/feeds/cells/${id}/1/public/full?alt=json`
        )
        .then(res => {
          const newArr = [];
          res.data.feed.entry.splice(5).forEach(item => {
            const cell = item["gs$cell"];
            if (cell["row"] > newArr.length + 1) {
              newArr.push({ email: cell["inputValue"] });
            }
            switch (cell["col"]) {
              case "2":
                newArr[newArr.length - 1].name = cell["inputValue"];
                break;
              case "3":
                newArr[newArr.length - 1].position = cell["inputValue"];
                break;
              case "4":
                newArr[newArr.length - 1].phone = cell["inputValue"];
                break;
              case "5":
                newArr[newArr.length - 1].url = cell["inputValue"];
                break;
            }
          });
          commit("setUser", newArr);
        })
        .catch(e => console.log(e));
    }
  },
  getters: {
    getOptions: state => state.options,
    manager: state => {
      return state.user;
    }
  }
};
