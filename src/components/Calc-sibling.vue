<template>
  <li v-if="square > 0" class="calc__row">
    <div class="calc__name">
      <b>{{ title }} {{ currentIndex }}:</b>
      {{ name }}, {{ color }}
    </div>
    <div class="calc__size">{{ square }} м<sup>2</sup></div>
    <div class="calc__price">{{ price }} ₽</div>
    <button class="calc__remove" type="button" @click="deleteItem">
      <span class="icon icon-close"></span>
    </button>
  </li>
</template>

<script>
import wNumb from "wnumb";

export default {
  name: "Calc-sibling",
  props: {
    title: String,
    item: Object,
    index: Number,
    category: String,
    letter: String
  },
  data() {
    return {};
  },
  computed: {
    currentIndex() {
      return this.index > 0 ? this.index + 1 : "";
    },
    square() {
      return this.item.square;
    },
    name() {
      return this.item.name;
    },
    color() {
      return this.item.color;
    },
    price() {
      return wNumb({
        decimals: 0,
        thousand: " "
      }).to(this.item.total);
    }
  },
  methods: {
    deleteItem() {
      this.$store.dispatch("deleteItem", {
        category: this.category,
        id: this.item.id,
        letter: this.letter
      });
    }
  }
};
</script>
