<template>
  <li v-if="square > 0" class="calc__row">
    <div class="calc__name">
      <b>Деталь {{ indexNumber }}:</b> {{ name }}, {{ color }},
      {{ typeNames[type - 1] }} {{ article }}
    </div>
    <div class="calc__size">{{ square }} м<sup>2</sup></div>
    <div class="calc__price">{{ price }} ₽</div>
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
    index: Number
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
    price() {
      return wNumb({
        decimals: 0,
        thousand: " "
      }).to(this.item.price * this.square);
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
