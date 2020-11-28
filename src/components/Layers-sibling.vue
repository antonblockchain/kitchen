<template>
  <li v-if="square > 0" class="calc__row">
    <div class="calc__name">
      <b>Деталь {{ indexNumber }}:</b> {{ name }}, {{ color }},
      {{ typeNames[type - 1] }} {{ article }}
    </div>
    <div class="calc__size">{{ square }} м<sup>2</sup></div>
    <div class="calc__price">{{ isOrder ? priceWithDiscount : price }} ₽</div>
  </li>
</template>

<script>
import wNumb from "wnumb";

export default {
  name: "Layers-sibling",
  props: {
    item: Object,
    category: String,
    parentId: Number,
    index: Number,
    isOrder: Boolean
  },
  data() {
    return {
      typeNames: ["Низ", "Верх", "Пенал"]
    };
  },
  computed: {
    name() {
      return this.item.name;
    },
    priceCount() {
      return this.item.price * this.square * this.extra;
    },
    price() {
      return wNumb({
        decimals: 0,
        thousand: " "
      }).to(this.priceCount || 0);
    },
    priceWithDiscount() {
      return wNumb({
        decimals: 0,
        thousand: " "
      }).to(this.priceCount * this.discount || 0);
    },
    discount() {
      return 1 - this.$store.getters.currentCalculation.discount / 100;
    },
    extra() {
      return 1 + this.$store.getters.currentOrder.extra / 100;
    },
    color() {
      return this.item.color;
    },
    square() {
      return this.item.square;
    },
    type() {
      return this.item.type;
    },
    article() {
      return this.item.article;
    },
    indexNumber() {
      return this.index + 1;
    }
  }
};
</script>
