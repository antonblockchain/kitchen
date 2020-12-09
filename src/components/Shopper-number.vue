<template>
  <div class="order__tel">
    <label class="order__label">
      <input
        type="tel"
        class="order__input page__input"
        placeholder="Номер телефона"
        v-model="number"
        :class="{ empty: number.length === 0 }"
      />
    </label>
    <button
      v-if="isLast"
      class="page__btn page__btn-grey btn"
      :class="{ empty: number.length === 0 }"
      type="button"
      @click="addNumber"
    >
      <span class="icon icon-plus"></span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Shopper-number",
  props: {
    item: Object,
    index: Number,
    isLast: Boolean
  },
  data: function() {
    return {
      number: this.item.tel
    };
  },
  computed: {
    shopperInfo() {
      return this.$store.getters.currentOrder.shopper;
    }
  },
  watch: {
    number() {
      this.$store.dispatch("updateShopperPhone", {
        number: this.number,
        index: this.index
      });
    }
  },
  methods: {
    addNumber() {
      this.$store.dispatch("addShopperPhone");
    }
  }
};
</script>
