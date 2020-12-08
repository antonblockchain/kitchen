<template>
  <div class="page__item" :class="{ '-page__item-black': isLast }">
    <label class="page__label page__label-fill">
      <!--      <span class="page__text">{{ id }}</span>-->
      <span class="page__text">{{ title }} {{ currentIndex }}</span>
      <v-select
        v-if="showSelect"
        :options="options"
        :reduce="item => item.name"
        label="name"
        v-model="itemName"
      />
      <input
        v-if="!showSelect"
        type="text"
        class="page__input"
        v-model.trim="itemName"
        placeholder=""
      />
    </label>
    <label v-if="showColor" class="page__label page__label-color">
      <span class="page__text">Цвет</span>
      <input
        type="text"
        class="page__input"
        v-model.trim="itemColor"
        placeholder=""
      />
    </label>
    <label v-if="showCount" class="page__label page__label-count">
      <span class="page__text">Кол-во</span>
      <input
        type="text"
        class="page__input"
        v-model.trim.number="itemCount"
        v-mask="'#########'"
        placeholder=""
      />
    </label>
    <label v-if="showPrice" class="page__label page__label-count">
      <span class="page__text">Цена</span>
      <input
        type="text"
        class="page__input"
        v-model.trim.number="itemPrice"
        v-mask="'#########'"
        placeholder=""
      />
    </label>
    <button
      class="page__btn page__btn-light btn"
      type="button"
      @click="cloneItem"
      :disabled="isLast"
    >
      <span class="icon icon-plus"></span>
    </button>
  </div>
</template>

<script>
import ItemTemplate from "@/utils/ItemTemplate";

export default {
  name: "Other",
  props: {
    id: Number,
    index: Number,
    item: Object,
    isLast: Boolean,
    title: String,
    category: String
  },
  data() {
    return {
      itemName: this.item.name,
      itemCount: this.item.count,
      itemColor: this.item.color,
      itemPrice: this.item.price,
      itemTotal: this.item.total
    };
  },
  computed: {
    showColor() {
      return (
        ["tabletop", "tabletop_psc", "wall_panel", "wall_panel_psc"].indexOf(
          this.category
        ) !== -1
      );
    },
    showCount() {
      return (
        [
          "loops",
          "boxes",
          "mechanisms",
          "tabletop",
          "wall_panel",
          "handles",
          "other"
        ].indexOf(this.category) !== -1
      );
    },
    showPrice() {
      return (
        ["tabletop_psc", "wall_panel_psc", "handles", "other"].indexOf(
          this.category
        ) !== -1
      );
    },
    showSelect() {
      return (
        ["wall_panel_psc", "tabletop_psc", "handles", "other"].indexOf(
          this.category
        ) === -1
      );
    },
    currentIndex() {
      return this.index !== 0 ? this.index + 1 : "";
    },
    options() {
      return this.$store.getters.getOptions[this.category];
    },
    total() {
      if (["tabletop_psc", "wall_panel_psc"].indexOf(this.category) !== -1) {
        return this.itemPrice;
      }
      return this.itemPrice * this.itemCount;
    }
  },
  watch: {
    itemName() {
      this.updateItem();
    },
    itemCount() {
      this.updateItem();
    },
    itemColor() {
      this.updateItem();
    },
    itemPrice() {
      this.updateItem();
    }
  },
  methods: {
    cloneItem() {
      this.$store.dispatch("addItem", {
        category: this.category,
        newItem: ItemTemplate[this.category]().item
      });
    },
    updateItem() {
      const options = this.$store.getters.getOptions[this.category];
      if (options) {
        options.some(item => {
          if (item.name === this.itemName && !this.showPrice) {
            this.itemPrice = item.price;
            return true;
          }
        });
      }

      const newData = {
        name: this.itemName,
        count: this.itemCount,
        color: this.itemColor,
        price: this.itemPrice,
        total: this.total
      };
      this.$store.dispatch("updateItem", {
        category: this.category,
        id: this.item.id,
        newData
      });
      this.$store.dispatch("updateCalculation");
    }
  }
};
</script>
