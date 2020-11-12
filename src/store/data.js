export default {
  state: {
    list: [
      {
        id: 1,
        name: "Brilliant",
        color: "",
        square: 0,
        options: [
          {
            id: 1,
            name: "Brilliant HGL",
            color: "Moro 5112B",
            square: 1.15,
            type: 1,
            width: 1000,
            height: 200,
            depth: 300,
            count: 2
          },
          {
            id: 2,
            name: "Brilliant 3",
            color: "Moro B",
            square: 0.01,
            type: 1,
            width: 133,
            height: 2,
            depth: 3,
            count: 4
          }
        ]
      },
      {
        id: 222,
        name: "Brilliant 2",
        color: "5112B",
        square: 0,
        options: [
          {
            id: 1,
            name: "HGL",
            color: "5112B",
            square: 0,
            type: 3,
            width: 1,
            height: 3,
            depth: 44,
            count: 5
          }
        ]
      }
    ]
  },
  mutations: {
    updateData(state, data) {
      state.list = data;
    },
    addItem(state, newItem) {
      const list = state.list;
      state.list = [newItem, ...list];
    },
    updateItem(state, { id, newData }) {
      let list = state.list;
      list = list.map(item => {
        if (item.id === id) {
          return {
            ...item,
            ...newData
          };
        }
        return item;
      });
      state.list = [...list];
    },
    addSiblings(state, { parentId, newItem }) {
      const list = state.list.map(item => {
        if (item.id === parentId) {
          item.options.push({
            ...newItem
          });
        }
        return item;
      });
      state.list = [...list];
    },
    updateSiblings(state, { parentId, id, newData }) {
      let list = state.list;
      list = list.map(item => {
        if (item.id === parentId) {
          item.options = item.options.map(sibling => {
            if (sibling.id === id) {
              return {
                ...sibling,
                ...newData
              };
            }
            return sibling;
          });
        }
        return item;
      });

      state.list = [...list];
    }
  },
  actions: {
    addItem({ commit }, data) {
      commit("addItem", data);
    },
    updateItem({ commit }, data) {
      commit("updateItem", data);
    },
    addSiblings({ commit }, data) {
      commit("addSiblings", data);
    },
    updateSiblings({ commit }, data) {
      commit("updateSiblings", data);
    }
  },
  getters: {
    list: state => {
      return state.list;
    }
  }
};
