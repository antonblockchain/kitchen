<template>
  <div class="page__item" :class="{ 'page__item-black': isLast }">
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
    <label class="page__label page__label-count">
      <span class="page__text">Кол-во</span>
      <input
        type="text"
        class="page__input"
        v-model.trim="itemCount"
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
      itemColor: this.item.color
    };
  },
  computed: {
    showColor() {
      return ["loops", "boxes", "mechanisms"].indexOf(this.category) === -1;
    },
    currentIndex() {
      return this.index !== 0 ? this.index + 1 : "";
    },
    options() {
      return this.$store.getters.getOptions[this.category];
    },
    showSelect() {
      return ["other"].indexOf(this.category) === -1;
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
      const newData = {
        name: this.itemName,
        count: this.itemCount
      };
      this.$store.dispatch("updateItem", {
        category: this.category,
        id: this.item.id,
        newData
      });
    }
  }
};
</script>
