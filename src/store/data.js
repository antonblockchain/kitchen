import CALC from "@/utils/calc";

export default {
  state: {
    currentOrder: 0,
    currentCalculation: 0,
    data: [
      {
        order: 894291,
        user: "Ткаченко В. Д.",
        time: "27.07.2020",
        list: [
          {
            name: "А",
            total: 162516,
            discount: 10,
            corps: [
              {
                id: 111111,
                name: "Brilliant",
                total: 11264,
                color: "Red",
                square: 28.16,
                options: [
                  {
                    id: 222222,
                    name: "Brilliant",
                    price: 400,
                    color: "",
                    square: 8.76,
                    type: 2,
                    width: 111,
                    height: 333,
                    depth: 333,
                    count: 343
                  },
                  {
                    id: 33333,
                    name: "Brilliant",
                    price: 400,
                    color: "",
                    square: 19.4,
                    type: 1,
                    width: 111,
                    height: 222,
                    depth: 333,
                    count: 777
                  }
                ]
              },
              {
                id: 44444,
                name: "Brilliant",
                total: 151252,
                color: "Black f",
                square: 378.13,
                options: [
                  {
                    id: 555555,
                    name: "Brilliant",
                    price: 400,
                    color: "",
                    square: 32.7,
                    type: 1,
                    width: 333,
                    height: 333,
                    depth: 333,
                    count: 343
                  },
                  {
                    id: 6666666,
                    name: "Brilliant",
                    price: 400,
                    color: "",
                    square: 345.43,
                    type: 3,
                    width: 3323,
                    height: 333,
                    depth: 333,
                    count: 333
                  }
                ]
              }
            ],
            facades: [
              {
                id: 6901,
                name: "",
                color: "",
                square: 0,
                options: []
              }
            ],
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
            name: "Б",
            total: 290860,
            discount: 10,
            corps: [
              {
                id: 2270,
                name: "Brilliant",
                total: 151252,
                color: "Black",
                square: 378.13,
                options: [
                  {
                    id: 111406,
                    name: "Brilliant",
                    price: 400,
                    color: "",
                    square: 32.7,
                    type: 1,
                    width: 333,
                    height: 333,
                    depth: 333,
                    count: 343
                  },
                  {
                    id: 34343,
                    name: "Brilliant",
                    price: 400,
                    color: "",
                    square: 345.43,
                    type: 3,
                    width: 3323,
                    height: 333,
                    depth: 333,
                    count: 333
                  }
                ]
              },
              {
                id: 413416,
                name: "Brilliant",
                total: 151252,
                color: "Black",
                square: 378.13,
                options: [
                  {
                    id: 114065,
                    name: "Brilliant",
                    price: 400,
                    color: "",
                    square: 32.7,
                    type: 1,
                    width: 333,
                    height: 333,
                    depth: 333,
                    count: 343
                  },
                  {
                    id: 43432,
                    name: "Brilliant",
                    price: 400,
                    color: "",
                    square: 345.43,
                    type: 3,
                    width: 3323,
                    height: 333,
                    depth: 333,
                    count: 333
                  }
                ]
              }
            ],
            facades: [
              {
                id: 6901,
                name: "",
                color: "",
                square: 0,
                options: []
              }
            ],
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
    ]
  },
  mutations: {
    copyCalculation({ data, currentOrder }, { name }) {
      if (data[currentOrder].list.length < 3) {
        let str = "АБВ";
        let newItem;
        data[currentOrder].list.forEach(item => {
          str = str.split(item.name).join("");
          if (item.name === name) {
            newItem = { ...item };
          }
        });
        console.log(str[0]);
        newItem.name = str[0];
        data[currentOrder].list.push(newItem);
      } else {
        alert("Максимум");
      }
    },
    addCalculation(state) {
      let str = "АБВ";
      state.data[state.currentOrder].list.forEach(item => {
        str = str.split(item.name).join("");
      });
      state.data[state.currentOrder].list.push({
        name: str[0],
        total: 0,
        discount: null,
        corps: [
          {
            id: CALC.generateID(),
            name: "",
            total: 0,
            color: "",
            square: 0,
            options: []
          }
        ],
        facades: [
          {
            id: CALC.generateID(),
            name: "",
            color: "",
            square: 0,
            options: []
          }
        ],
        loops: [],
        boxes: [],
        mechanisms: [],
        tabletop: [],
        "tabletop-psc": [],
        "wall-panel": [],
        "wall-panel-psc": [],
        handles: [],
        other: []
      });
    },
    editCalculation(state, { name }) {
      state.data[state.currentOrder].list.find((item, index) => {
        if (item.name === name) {
          state.currentCalculation = index;
          return true;
        }
        return false;
      });
    },
    deleteCalculation(state, { name, commit }) {
      let { data, currentOrder } = state;
      if (data[currentOrder].list.length <= 1) {
        commit("addCalculation");
      }
      let num = state.currentCalculation;
      data[currentOrder].list = data[currentOrder].list.filter(
        (item, index) => {
          const isTrue = item.name !== name;
          if (!isTrue && num >= index && state.currentCalculation > 0) {
            state.currentCalculation -= 1;
          }
          return isTrue;
        }
      );
    },
    updateCalculation({ data, currentOrder, currentCalculation }) {
      const order = data[currentOrder].list[currentCalculation];
      console.log(order);
      let total = 0;
      total += order.corps.reduce((acc, item) => {
        return acc + item.total;
      }, 0);
      order.total = total;
    },
    addItem({ data, currentOrder, currentCalculation }, { category, newItem }) {
      data[currentOrder].list[currentCalculation][category] = [
        newItem,
        ...data[currentOrder].list[currentCalculation][category]
      ];
    },
    updateItem(
      { data, currentOrder, currentCalculation },
      { category, id, newData }
    ) {
      let list = data[currentOrder].list[currentCalculation][category].map(
        item => {
          if (item.id === id) {
            return {
              ...item,
              ...newData
            };
          }
          return item;
        }
      );
      data[currentOrder].list[currentCalculation][category] = [...list];
    },
    addSiblings(
      { data, currentOrder, currentCalculation },
      { category, parentId, newItem }
    ) {
      const list = data[currentOrder].list[currentCalculation][category].map(
        item => {
          if (item.id === parentId) {
            item.options.push({
              ...newItem
            });
          }
          return item;
        }
      );
      data[currentOrder].list[currentCalculation][category] = [...list];
    },
    updateSiblings(
      { data, currentOrder, currentCalculation },
      { category, parentId, id, newData }
    ) {
      const list = data[currentOrder].list[currentCalculation][category].map(
        item => {
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
        }
      );
      data[currentOrder].list[currentCalculation][category] = [...list];
    }
  },
  actions: {
    addCalculation({ commit }) {
      commit("addCalculation");
    },
    copyCalculation({ commit }, data) {
      commit("copyCalculation", data);
    },
    editCalculation({ commit }, data) {
      commit("editCalculation", data);
    },
    deleteCalculation({ commit }, data) {
      commit("deleteCalculation", { commit, name: data.name });
    },
    updateCalculation({ commit }) {
      commit("updateCalculation");
    },
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
    orderList: state => {
      return state.data;
    },
    calculationList: state => {
      return state.data[state.currentOrder].list;
    },
    currentOrder: state => {
      return state.data[state.currentOrder];
    },
    currentCalculation: state => {
      return state.data[state.currentOrder].list[state.currentCalculation];
    }
  }
};
