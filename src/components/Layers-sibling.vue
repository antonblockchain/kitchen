<template>
  <li v-if="square > 0" class="calc__row">
    <div class="calc__name">
      <b>Деталь {{ indexNumber }}:</b> {{ name ? `${name},` : "" }}
      {{ color ? `${color},` : "" }} {{ typeNames[type - 1] }} , {{ height }}x{{
        depth
      }}x{{ width }}
    </div>
    <div class="calc__size">{{ square }} м<sup>2</sup></div>
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
  name: "Layers-sibling",
  props: {
    item: Object,
    category: String,
    parentId: Number,
    index: Number,
    isOrder: Boolean,
    letter: String
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
    },
    width() {
      return this.item.width;
    },
    height() {
      return this.item.height;
    },
    depth() {
      return this.item.depth;
    }
  },
  methods: {
    deleteItem() {
      console.log("deleteSiblings");
      this.$store.dispatch("deleteSiblings", {
        category: this.category,
        parentId: this.parentId,
        id: this.item.id,
        letter: this.letter
      });
    }
  }
};
</script>
