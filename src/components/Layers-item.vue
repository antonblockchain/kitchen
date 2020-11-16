<template>
  <li v-if="square > 0">
    <div class="layers__item calc__row">
      <div class="calc__name">
        <b>{{ title }} {{ currentIndex }}:</b> {{ name }}, {{ color }}
      </div>
      <div class="calc__size">{{ square }} м<sup>2</sup></div>
      <div class="calc__price">{{ price }} ₽</div>
    </div>
    <ul>
      <LayersSibling
        v-for="(layer, index) in item.options"
        :key="layer.id"
        :item="layer"
        :index="index"
        :category="category"
        :parentId="item.id"
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
    category: String
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
  }
};
</script>

<style scoped></style>
