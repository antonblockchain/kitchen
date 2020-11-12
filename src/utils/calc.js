export default {
  fixNumber(number) {
    return Math.round(number * 100) / 100;
  },
  square(type, ...arg) {
    let res;
    switch (type) {
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
    return this.fixNumber(a * b);
  },
  generateID() {
    return +(Math.random() * 10000).toFixed(0);
  }
};
