<template>
  <div>
    <div v-show="showCalc" class="page__item page__item-grey">
      <label class="page__label page__label-large">
        <span class="page__text">Деталь фасадов {{ index + 1 }}</span>
        <v-select
          :options="options"
          :reduce="item => item.name"
          label="name"
          v-model="itemName"
        />
      </label>
      <label class="page__label page__label-color">
        <span class="page__text">Цвет</span>
        <input type="text" v-model="itemColor" class="page__input" />
      </label>
      <label class="page__label">
        <span class="page__text">М<sup>2</sup></span>
        <input
          type="text"
          class="page__input page__input-number"
          :value="square"
          readonly
        />
      </label>

      <button class="page__btn btn" @click="toggleCalc" type="button">
        <span class="icon icon-layers"></span>
      </button>
      <button
        v-if="isLast"
        class="page__btn btn"
        type="button"
        @click="cloneItem"
      >
        <span class="icon icon-plus"></span>
      </button>
    </div>

    <div v-show="!showCalc" class="page__item page__item-red">
      <label class="page__label page__label-type">
        <span class="page__text">Тип</span>
        <span class="page__label_select">
          <v-select
            :options="optionsType"
            :reduce="item => item.type"
            label="name"
            v-model="itemType"
            placeholder="Без типа"
          />
        </span>
      </label>
      <label class="page__label page__label-article">
        <span class="page__text">Артикул</span>
        <input
          type="text"
          class="page__input"
          v-model.trim="itemArticle"
          placeholder=""
        />
      </label>
      <label class="page__label">
        <span class="page__text">Ширина</span>
        <input
          type="text"
          class="page__input"
          v-mask="'########'"
          v-model.number="itemWidth"
        />
      </label>
      <label class="page__label">
        <span class="page__text">Высота</span>
        <input
          type="text"
          class="page__input"
          v-mask="'########'"
          v-model.number="itemHeight"
        />
      </label>
      <div class="page__label page__label-res">
        <label>
          <span class="page__text">М<sup>2</sup></span>
          <input type="text" class="page__input" :value="square" readonly />
        </label>
        <button
          type="button"
          class="page__label_check icon icon-check"
          @click="toggleCalc"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import CALC from "@/utils/calc";
import ItemTemplate from "@/utils/ItemTemplate";

export default {
  name: "Facades-sibling",
  props: {
    id: Number,
    index: Number,
    parentId: Number,
    item: Object,
    isLast: Boolean,
    defaultName: String,
    defaultColor: String
  },
  data() {
    return {
      category: "facades",
      hasSiblings: false,
      showCalc: true,
      itemName: this.item.name,
      itemColor: this.item.color,
      itemType: this.item.type,
      itemWidth: this.item.width,
      itemHeight: this.item.height,
      itemArticle: this.item.article,
      optionsType: [
        { name: "Низ", type: 1 },
        { name: "Верх", type: 2 },
        { name: "Пенал", type: 3 }
      ]
    };
  },
  computed: {
    square() {
      const res = CALC.squareAB(this.itemWidth, this.itemHeight);
      if (res > 0) {
        return res;
      }
      return 0;
    },
    options() {
      return this.$store.getters.getOptions[this.category];
    }
  },
  watch: {
    itemName() {
      this.updateItem();
    },
    itemColor() {
      this.updateItem();
    },
    itemArticle() {
      this.updateItem();
    },
    square() {
      this.updateItem();
    }
  },
  methods: {
    cloneItem() {
      this.hasSiblings = true;
      const newSibling = {
        ...ItemTemplate[this.category]().sibling,
        name: this.defaultName,
        color: this.defaultColor
      };
      this.$store.dispatch("addSiblings", {
        category: this.category,
        parentId: this.parentId,
        newItem: newSibling
      });
    },
    toggleCalc() {
      this.showCalc = !this.showCalc;
    },
    updateItem() {
      let price = 0;

      this.$store.getters.getOptions[this.category].some(item => {
        if (item.name === this.itemName) {
          price = item.price;
          return true;
        }
      });

      const newData = {
        name: this.itemName,
        price: price,
        color: this.itemColor,
        square: this.square,
        type: this.itemType,
        width: this.itemWidth,
        height: this.itemHeight,
        article: this.itemArticle
      };
      this.$store.dispatch("updateSiblings", {
        category: this.category,
        parentId: this.parentId,
        id: this.item.id,
        newData
      });
      this.$store.dispatch("updateCalculation");
    }
  }
};
</script>
