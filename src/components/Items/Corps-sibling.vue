<template>
  <div>
    <div v-if="showCalc" class="page__item page__item-grey">
      <label class="page__label page__label-large">
        <span class="page__text">Деталь корпуса {{ index + 1 }}</span>
        <span class="page__label_w">
          <input type="text" class="page__input" v-model="itemName" />
          <a href="#prod" class="icon icon-search js-popup"></a>
        </span>
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
        <span class="icon icon-calc"></span>
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

    <div v-if="!showCalc" class="page__item page__item-red">
      <label class="page__label page__label-type">
        <span class="page__text">Тип</span>
        <span class="page__label_select">
          <select class="page__select js-select" v-model.number="itemType">
            <option value="0" disabled>Без типа</option>
            <option value="1">Низ</option>
            <option value="2">Верх</option>
            <option value="3">Пенал</option>
          </select>
        </span>
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
      <label class="page__label">
        <span class="page__text">Глубина</span>
        <input
          type="text"
          class="page__input"
          v-mask="'########'"
          v-model.number="itemDepth"
        />
      </label>
      <label class="page__label">
        <span class="page__text">Полки</span>
        <input
          type="text"
          class="page__input"
          v-mask="'########'"
          v-model.number="itemCount"
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

export default {
  name: "Corps-siblings",
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
      hasSiblings: false,
      showCalc: true,
      itemName: this.item.name,
      itemColor: this.item.color,
      itemType: this.item.type,
      itemWidth: this.item.width,
      itemHeight: this.item.height,
      itemDepth: this.item.depth,
      itemCount: this.item.count
    };
  },
  computed: {
    square() {
      const res = CALC.square(
        this.itemType,
        this.itemWidth,
        this.itemHeight,
        this.itemDepth,
        this.itemCount
      );
      if (res > 0) {
        return res;
      }
      return 0;
    }
  },
  watch: {
    itemName() {
      this.updateItem();
    },
    itemColor() {
      this.updateItem();
    },
    square() {
      this.updateItem();
    }
  },
  methods: {
    cloneItem() {
      this.hasSiblings = true;
      const newItem = {
        id: CALC.generateID(),
        name: this.defaultName,
        color: this.defaultColor,
        square: 0,
        type: 0,
        width: 0,
        height: 0,
        depth: 0,
        count: 0
      };
      this.$store.dispatch("addSiblings", {
        parentId: this.parentId,
        newItem
      });
    },
    toggleCalc() {
      this.showCalc = !this.showCalc;
    },
    updateItem() {
      const newData = {
        name: this.itemName,
        color: this.itemColor,
        square: this.square,
        type: this.itemType,
        width: this.itemWidth,
        height: this.itemHeight,
        depth: this.itemDepth,
        count: this.itemCount
      };
      this.$store.dispatch("updateSiblings", {
        parentId: this.parentId,
        id: this.item.id,
        newData
      });
    }
  }
};
</script>
