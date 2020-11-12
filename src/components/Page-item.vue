<template>
  <div>
    <div class="page__item" :class="{ 'page__item-black': isLast }">
      <label class="page__label page__label-large">
        <span class="page__text">
          Материал корпуса {{ index !== 0 ? index + 1 : null }}
        </span>
        <span class="page__label_w">
          <input
            type="text"
            class="page__input"
            placeholder=""
            v-model.trim="itemName"
          />
          <a href="#prod" class="icon icon-search js-popup"></a>
        </span>
      </label>
      <label class="page__label page__label-color">
        <span class="page__text">Цвет</span>
        <input
          type="text"
          class="page__input"
          v-model.trim="itemColor"
          placeholder=""
        />
      </label>
      <label class="page__label">
        <span class="page__text">М<sup>2</sup></span>
        <input
          type="text"
          class="page__input"
          placeholder=""
          :value="total"
          readonly
        />
      </label>

      <button
        class="page__btn btn"
        :class="{ 'page__btn-black': isLast }"
        type="button"
        @click="toggleParams"
      >
        <span class="icon icon-cube"></span>
      </button>
      <button
        class="page__btn page__btn-light btn"
        type="button"
        @click="cloneItem"
        v-if="!isLast"
      >
        <span class="icon icon-plus"></span>
      </button>
    </div>

    <PageSiblings
      v-for="(sibling, index) in item.options"
      v-show="showParams"
      :key="sibling.id"
      :id="sibling.id"
      :index="index"
      :item="sibling"
      :parentId="item.id"
      :isLast="item.options.length === index + 1"
      :defaultName="itemName"
      :defaultColor="itemColor"
    />
  </div>
</template>

<script>
import PageSiblings from "@/components/Page-siblings";
import CALC from "@/utils/calc";

export default {
  name: "Page-item",
  components: { PageSiblings },
  props: {
    id: Number,
    index: Number,
    item: Object,
    isLast: Boolean
  },
  data() {
    return {
      showParams: false,
      itemName: this.item.name,
      itemColor: this.item.color,
      itemSize: this.item.size
    };
  },
  computed: {
    total() {
      return CALC.fixNumber(
        this.item.options.reduce((acc, item) => {
          return acc + item.square;
        }, 0)
      );
    }
  },
  watch: {
    itemName() {
      this.updateItem();
    },
    itemColor() {
      this.updateItem();
    },
    total() {
      this.updateItem();
    }
  },
  methods: {
    cloneItem() {
      const newItem = {
        id: CALC.generateID(),
        name: "",
        color: "",
        square: 0,
        options: []
      };
      this.$store.dispatch("addItem", newItem);
    },
    toggleParams() {
      if (this.item.options.length === 0) {
        const newItem = {
          id: CALC.generateID(),
          name: this.item.name,
          color: this.item.color,
          square: 0,
          type: 0,
          width: 0,
          height: 0,
          depth: 0,
          count: 0
        };
        this.$store.dispatch("addSiblings", {
          parentId: this.item.id,
          newItem
        });
      }
      this.showParams = !this.showParams;
    },
    updateItem() {
      const newData = {
        name: this.itemName,
        color: this.itemColor,
        square: this.total
      };
      this.$store.dispatch("updateItem", {
        id: this.item.id,
        newData
      });
    }
  }
};
</script>
