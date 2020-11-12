export default {
  state: {
    data: [
      {
        order: 1,
        user: "Ткаченко Владислав Дмитриевич",
        time: "27.07.2020",
        list: [
          {
            name: "R",
            total: 0,
            discount: 0,
            corps: [
              {
                id: 1,
                name: "Brilliant",
                color: "",
                square: 0,
                type: 0,
                options: []
              }
            ],
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
          },
          {
            name: "B",
            total: 0,
            discount: 0,
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
        ]
      }
    ],

    list2: [
      {
        name: "A",
        total: 0,
        discount: 0,
        corps: [
          {
            id: 1,
            name: "Brilliant",
            color: "",
            square: 0,
            type: 0,
            options: []
          }
        ],
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
    ],
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
      let list = state.list.map(item => {
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
    data: state => {
      return state.data;
    },
    list: state => {
      return state.list;
    }
  }
};
