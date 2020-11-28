import CALC from "@/utils/calc";
import ItemTemplate from "@/utils/ItemTemplate";

export default {
  state: {
    currentOrder: 0,
    currentCalculation: 0,
    user: {
      name: "Ткаченко Владислав",
      position: "Менеджер"
    },
    data: [ItemTemplate.fakeData()]
  },
  mutations: {
    updateOrderName(state, { order, user }) {
      state.data.some(item => {
        const isCurrent = item.order === order;
        if (isCurrent) {
          item.user = user;
        }
        return isCurrent;
      });
    },
    addOrder(state) {
      state.data.push(ItemTemplate.order());
    },
    setOrder(state, id) {
      state.currentOrder = state.data.findIndex(item => item.order === id);
    },
    updateOrderExtra({ data, currentOrder }, { extra }) {
      data[currentOrder].extra = +extra;
    },
    copyCalculation({ data, currentOrder }, { name }) {
      if (data[currentOrder].list.length < 3) {
        let newItem = data[currentOrder].list.find(item => item.name === name);

        let newItem2 = CALC.rewriteID(newItem);
        newItem2.name = CALC.uniqueLetter(data[currentOrder].list);

        data[currentOrder].list.push(newItem2);
      } else {
        alert("Максимум");
      }
    },
    addCalculation(state) {
      let newLetter = CALC.uniqueLetter(state.data[state.currentOrder].list);
      state.data[state.currentOrder].list.push({
        ...ItemTemplate.calculation(),
        name: newLetter
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
      let total = 0;
      const categoryList = ItemTemplate.listCategory();

      total += categoryList.reduce((acc, category) => {
        return acc + order[category].reduce((acc, item) => acc + item.total, 0);
      }, 0);

      order.total = total;
    },
    updateCalculationDiscount(
      { data, currentOrder },
      { discount, currentCalc }
    ) {
      data[currentOrder].list[currentCalc].discount = +discount;
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
    deleteItem({ data, currentOrder }, { category, id, letter }) {
      data[currentOrder].list.forEach(calc => {
        if (calc.name === letter) {
          if (calc[category].length === 1) {
            calc[category].push({ ...ItemTemplate[category]().item });
          }
          calc[category] = calc[category].filter(item => item.id !== id);
        }
      });
    },
    addSiblings(
      { data, currentOrder, currentCalculation },
      { category, parentId, newItem }
    ) {
      data[currentOrder].list[currentCalculation][category] = data[
        currentOrder
      ].list[currentCalculation][category].map(item => {
        if (item.id === parentId) {
          item.options.push({
            ...newItem
          });
        }
        return item;
      });
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
    updateOrderName({ commit }, data) {
      commit("updateOrderName", data);
    },
    addOrder({ commit }) {
      commit("addOrder");
    },
    setOrder({ commit }, data) {
      commit("setOrder", data);
    },
    updateOrderExtra({ commit }, data) {
      commit("updateOrderExtra", data);
    },
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
    updateCalculationDiscount({ commit }, data) {
      commit("updateCalculationDiscount", data);
    },
    addItem({ commit }, data) {
      commit("addItem", data);
    },
    updateItem({ commit }, data) {
      commit("updateItem", data);
    },
    deleteItem({ commit }, data) {
      commit("deleteItem", data);
    },
    addSiblings({ commit }, data) {
      commit("addSiblings", data);
    },
    updateSiblings({ commit }, data) {
      commit("updateSiblings", data);
    }
  },
  getters: {
    allState: state => {
      return state;
    },
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
    },
    currentNumberCalculation: state => {
      return state.currentCalculation;
    }
  }
};
