import ItemTemplate from "@/utils/ItemTemplate";

export default {
  fixNumber(number) {
    return Math.round(number * 100) / 100;
  },
  square(type, ...arg) {
    let res;
    switch (type) {
      case 0:
        res = 0;
        break;
      case 1:
        res = this.squareDown(...arg);
        break;
      case 2:
        res = this.squareUp(...arg);
        break;
      case 3:
        res = this.squarePenal(...arg);
        break;
      default:
        return null;
    }
    return this.fixNumber(res);
  },
  squareDown(a, b, c, n) {
    return (
      (b * c * 2 +
        c * (a - 32) +
        100 * (a - 32) * 2 +
        (a - 32) * (c - 20) * n) *
      0.000001
    );
  },
  squareUp(a, b, c, n) {
    return (b * c * 2 + c * (a - 32) * 2 + (a - 32) * (c - 20) * n) * 0.000001;
  },
  squarePenal(a, b, c, n) {
    return (b * c * 2 + c * (a - 32) * 2 + (a - 32) * (c - 20) * n) * 0.000001;
  },
  squareAB(a, b) {
    return this.fixNumber(a * b * 0.000001);
  },
  generateID() {
    return Math.floor(Math.random() * 899999 + 100000);
  },
  uniqueLetter(arr) {
    let str = "АБВ";
    arr.forEach(item => {
      str = str.split(item.name).join("");
    });
    return str[0];
  },
  rewriteID(obj) {
    const newItem = JSON.parse(JSON.stringify(obj));
    const changeID = arr => {
      arr.forEach(item => {
        item.id = this.generateID();
        if (item.options) {
          changeID(item.options);
        }
      });
    };

    ItemTemplate.listCategory().forEach(item => changeID(newItem[item]));

    return newItem;
  }
};
