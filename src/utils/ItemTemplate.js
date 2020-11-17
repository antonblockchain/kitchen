import CALC from "@/utils/calc";

export default {
  listCategory() {
    return [
      "corps",
      "facades",
      "loops",
      "boxes",
      "mechanisms",
      "tabletop",
      "tabletop_psc",
      "wall_panel",
      "wall_panel_psc",
      "handles",
      "other"
    ];
  },
  namesCategory() {
    return {
      corps: "Материал корпуса",
      facades: "Комплект фасадов",
      loops: "Фурнитура Петли",
      boxes: "Фурнитура Ящики",
      mechanisms: "Фурнитура Подъемные механизмы",
      tabletop: "Столешница",
      tabletop_psc: "Столешница (ПСЦ)",
      wall_panel: "Стеновая панель",
      wall_panel_psc: "Стеновая панель (ПСЦ)",
      handles: "Ручки",
      other: "Прочее"
    };
  },
  corps() {
    return {
      item: {
        id: CALC.generateID(),
        name: "",
        total: 0,
        color: "",
        square: 0,
        options: []
      },
      sibling: {
        id: CALC.generateID(),
        name: "",
        price: 0,
        color: "",
        square: 0,
        type: 0,
        width: null,
        height: null,
        depth: null,
        count: null
      }
    };
  },
  facades() {
    return {
      item: this.corps().item,
      sibling: {
        id: CALC.generateID(),
        name: "",
        price: 0,
        color: "",
        square: 0,
        type: 0,
        width: null,
        height: null,
        article: ""
      }
    };
  },
  loops() {
    return {
      item: {
        id: CALC.generateID(),
        name: "",
        count: "",
        color: "",
        price: null
      }
    };
  },
  boxes() {
    return this.loops();
  },
  mechanisms() {
    return this.loops();
  },
  tabletop() {
    return this.loops();
  },
  tabletop_psc() {
    return this.loops();
  },
  wall_panel() {
    return this.loops();
  },
  wall_panel_psc() {
    return this.loops();
  },
  handles() {
    return this.loops();
  },
  other() {
    return this.loops();
  },
  order() {
    return {
      order: CALC.generateID(),
      user: "",
      time: CALC.generateDate(),
      list: [this.calculation()]
    };
  },
  calculation() {
    return {
      name: "А",
      total: 0,
      discount: null,
      corps: [this.corps().item],
      facades: [this.facades().item],
      loops: [this.loops().item],
      boxes: [this.boxes().item],
      mechanisms: [this.mechanisms().item],
      tabletop: [this.tabletop().item],
      tabletop_psc: [this.tabletop_psc().item],
      wall_panel: [this.wall_panel().item],
      wall_panel_psc: [this.wall_panel_psc().item],
      handles: [this.handles().item],
      other: [this.other().item]
    };
  },
  fakeData() {
    return {
      order: 894291,
      user: "Ткаченко В. Д.",
      time: "27.07.2020",
      list: [
        {
          name: "А",
          total: 162516,
          discount: null,
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
          loops: [this.loops().item],
          boxes: [this.loops().item],
          mechanisms: [this.loops().item],
          tabletop: [this.loops().item],
          tabletop_psc: [this.loops().item],
          wall_panel: [this.loops().item],
          wall_panel_psc: [this.loops().item],
          handles: [this.loops().item],
          other: [this.loops().item]
        },
        {
          name: "Б",
          total: 0,
          discount: null,
          corps: [this.corps().item],
          facades: [this.facades().item],
          loops: [this.loops().item],
          boxes: [this.loops().item],
          mechanisms: [this.loops().item],
          tabletop: [this.loops().item],
          tabletop_psc: [this.loops().item],
          wall_panel: [this.loops().item],
          wall_panel_psc: [this.loops().item],
          handles: [this.loops().item],
          other: [this.loops().item]
        }
      ]
    };
  }
};
