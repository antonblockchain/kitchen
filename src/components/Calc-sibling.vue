<template>
  <!--  <li class="calc__row">-->
  <li v-if="item.total > 0" class="calc__row">
    <div class="calc__name">
      <b>{{ title }} {{ currentIndex }}:</b>
      {{ name }}, {{ color }}
    </div>
    <div v-if="square > 0" class="calc__size">{{ square }} м<sup>2</sup></div>
    <div v-if="count > 0" class="calc__size">{{ count }} шт.</div>

    <div v-if="isOrder" class="calc__interest color-red">
      <label>
        <input
          type="text"
          class="page__header_name"
          v-autowidth="{
            maxWidth: '5rem',
            minWidth: '3rem',
            comfortZone: 0
          }"
          v-model="prepay"
          placeholder="0"
          v-mask="'###'"
          v-int
      /></label>
      %
    </div>
    <div class="calc__price">{{ isOrder ? priceWithDiscount : price }} ₽</div>
    <button
      v-if="!isOrder"
      class="calc__remove"
      type="button"
      @click="deleteItem"
    >
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
    letter: String,
    isOrder: Boolean
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
    count() {
      return this.item.count;
    },
    name() {
      return this.item.name;
    },
    color() {
      return this.item.color;
    },
    priceCount() {
      return this.item.total * this.extra;
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
    prepay: {
      get() {
        return this.item.prepay;
      },
      set(val) {
        this.item.prepay = Math.min(Math.max(val, 0), 100);
      }
    },
    extra() {
      return 1 + this.$store.getters.currentOrder.extra / 100;
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
