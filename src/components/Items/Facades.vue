<template>
  <div>
    <div class="page__item" :class="{ 'page__item-black': showParams }">
      <label class="page__label page__label-large">
        <span class="page__text"> Комплект фасадов {{ currentIndex }} </span>
        <v-select
          :options="options"
          :reduce="item => item.name"
          label="name"
          v-model="itemName"
        />
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
          class="page__input page__input-number"
          placeholder=""
          v-model.number="square"
          :readonly="item.options.length > 0"
          v-int
        />
      </label>

      <button
        class="page__btn btn"
        :class="{ 'page__btn-black': showParams }"
        type="button"
        @click="toggleParams"
      >
        <span class="icon icon-layers"></span>
      </button>
      <button
        class="page__btn btn"
        :class="{
          'page__btn-light': !showParams,
          'page__btn-grey': showParams
        }"
        type="button"
        @click="cloneItem"
        v-if="!isLast"
      >
        <span class="icon icon-plus"></span>
      </button>
    </div>

    <Siblings
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
import Siblings from "@/components/Items/Facades-sibling";
import CALC from "@/utils/calc";
import ItemTemplate from "@/utils/ItemTemplate";

export default {
  name: "Facades",
  components: { Siblings },
  props: {
    id: Number,
    index: Number,
    item: Object,
    isLast: Boolean
  },
  data() {
    return {
      category: "facades",
      showParams: false,
      itemName: this.item.name,
      itemColor: this.item.color,
      itemSize: this.item.size
    };
  },
  computed: {
    currentIndex() {
      return this.index !== 0 ? this.index + 1 : "";
    },
    square: {
      get() {
        if (this.item.options.length > 0) {
          return CALC.fixNumber(
            this.item.options.reduce((acc, item) => {
              return acc + item.square;
            }, 0)
          );
        } else {
          return this.item.square;
        }
      },
      set(val) {
        this.updateSquare(val);
      }
    },
    total() {
      if (this.item.options.length > 0) {
        return CALC.fixNumber(
          this.item.options.reduce((acc, item) => {
            return acc + item.price * item.square;
          }, 0)
        );
      } else {
        const res = this.options.find(item => item.name === this.itemName);
        return CALC.fixNumber(this.square * (res ? res.price : 0));
      }
    },
    options() {
      return this.$store.getters.getOptions[this.category];
    }
  },
  watch: {
    itemName() {
      this.updateItem();
      this.updateNames();
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
      this.$store.dispatch("addItem", {
        category: this.category,
        newItem: ItemTemplate[this.category]().item
      });
    },
    toggleParams() {
      if (this.item.options.length === 0) {
        const newSibling = {
          ...ItemTemplate[this.category]().sibling,
          name: this.item.name,
          color: this.item.color
        };
        this.$store.dispatch("addSiblings", {
          category: this.category,
          parentId: this.item.id,
          newItem: newSibling
        });
      }
      this.showParams = !this.showParams;
    },
    updateItem() {
      const newData = {
        name: this.itemName,
        color: this.itemColor,
        square: this.square,
        total: this.total
      };
      this.$store.dispatch("updateItem", {
        category: this.category,
        id: this.item.id,
        newData
      });
    },
    updateSquare(square) {
      let newData = {
        square: +square || 0
      };
      this.$store.dispatch("updateItem", {
        category: this.category,
        id: this.item.id,
        newData
      });
    },
    updateNames() {
      this.item.options.forEach(item => {
        const newData = {
          name: this.itemName
        };
        this.$store.dispatch("updateSiblings", {
          category: this.category,
          parentId: this.item.id,
          id: item.id,
          newData
        });
      });
    }
  }
};
</script>
