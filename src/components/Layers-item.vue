<template>
  <!--  <li v-if="square > 0">-->
  <!--  <li>-->
  <li v-if="item.total > 0">
    <div class="layers__item calc__row">
      <div class="calc__name">
        <b>{{ title }} {{ currentIndex }}:</b> {{ name }}, {{ color }}
      </div>
      <div v-if="square > 0" class="calc__size">{{ square }} м<sup>2</sup></div>
      <div v-if="count > 0" class="calc__size">{{ count }} шт.</div>
      <div class="calc__price">{{ isOrder ? priceWithDiscount : price }} ₽</div>
    </div>
    <ul v-if="item.options">
      <LayersSibling
        v-for="(layer, index) in item.options"
        :key="layer.id"
        :item="layer"
        :index="index"
        :category="category"
        :parentId="item.id"
        :isOrder="isOrder"
      />
    </ul>
  </li>
</template>

<script>
import wNumb from "wnumb";
import LayersSibling from "@/components/Layers-sibling";

export default {
  name: "Layers-item",
  components: { LayersSibling },
  props: {
    title: String,
    item: Object,
    index: Number,
    category: String,
    isOrder: Boolean
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
    extra() {
      return 1 + this.$store.getters.currentOrder.extra / 100;
    }
  }
};
</script>

<style scoped></style>
