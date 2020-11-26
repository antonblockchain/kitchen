<template>
  <div v-show="!isShow" class="calc__item">
    <div class="calc__head">
      <div class="calc__head_title">
        ПРОСЧЕТ <span>{{ name }}</span>
      </div>
      <div
        v-if="isOpenContent"
        class="calc__nav"
        :class="{ active: isOpenSettings }"
      >
        <div class="calc__nav_menu">
          <button type="button" class="calc__nav_link" @click="editCalculation">
            Редактировать
          </button>
          <button type="button" class="calc__nav_link" @click="copyCalculation">
            Дублировать
          </button>
          <button
            type="button"
            class="calc__nav_link"
            @click="deleteCalculation"
          >
            Удалить
          </button>
          <label>
            <input
              type="text"
              class="calc__nav_link"
              v-autowidth="{
                maxWidth: '20rem',
                minWidth: '2rem',
                comfortZone: 0
              }"
              v-model="discount"
              v-mask="'###'"
              placeholder="%"
              v-int
            />
          </label>
        </div>
        <button class="calc__nav_toggle" type="button" @click="toggleSettings">
          <span class="icon icon-more"></span>
        </button>
      </div>
      <button
        v-if="!isOpenContent"
        class="calc__show"
        type="button"
        @click="toggleContent"
      >
        <span class="icon icon-down"></span>
      </button>
    </div>

    <div class="calc__content" v-if="isOpenContent">
      <div class="calc__list">
        <ul v-for="cat in categoryList" :key="cat">
          <CalcSibling
            v-for="(item, index) in item[cat].slice().reverse()"
            :key="item.id"
            :title="categoryName[cat]"
            :item="item"
            :index="index"
            :category="cat"
            :letter="name"
            :isOrder="true"
          />
        </ul>
      </div>

      <div class="calc__total">
        <div class="calc__total_title">ИТОГО:</div>
        <div v-if="discount > 0" class="calc__total_price">
          {{ formatPrice(total) }} ₽<sup>-{{ discount }}%</sup>
          <del>{{ finalPrice }} ₽</del>
        </div>
        <div v-else class="calc__total_price">{{ total }} ₽</div>
      </div>

      <div class="layers">
        <button class="layers__top" type="button" @click="toggleDetails">
          <span class="icon icon-layers"></span>
        </button>
        <div v-if="isOpenDetails" class="layers__list">
          <ul v-for="cat in categoryList" :key="cat">
            <LayersItem
              v-for="(item, index) in item[cat].slice().reverse()"
              :key="item.id"
              :title="categoryName[cat]"
              :item="item"
              :index="index"
              :category="cat"
            />
          </ul>
        </div>
      </div>

      <button class="calc__toggle" type="button" @click="toggleContent">
        <span class="icon icon-down"></span>
      </button>
    </div>
  </div>
</template>

<script>
import wNumb from "wnumb";
import CalcSibling from "@/components/Calc-sibling";
import LayersItem from "@/components/Layers-item";
import ItemTemplate from "@/utils/ItemTemplate";

export default {
  name: "Calc-item",
  components: { LayersItem, CalcSibling },
  props: {
    item: Object,
    index: Number
  },
  data() {
    return {
      isOpenContent: !false,
      isOpenSettings: !false,
      isOpenDetails: false,
      name: this.item.name
    };
  },
  computed: {
    finalPrice() {
      return this.formatPrice((this.total * (100 + this.discount)) / 100);
    },
    total() {
      return this.item.total;
    },
    discount: {
      get() {
        return this.item.discount;
      },
      set(val) {
        this.updateDiscount(Math.min(Math.max(val, 0), 100));
      }
    },
    categoryList() {
      return ItemTemplate.listCategory();
    },
    categoryName() {
      return ItemTemplate.namesCategory();
    },
    isShow() {
      return false;
      // return this.$store.getters.currentNumberCalculation === this.index;
    }
  },
  methods: {
    toggleContent() {
      this.isOpenContent = !this.isOpenContent;
    },
    toggleSettings() {
      this.isOpenSettings = !this.isOpenSettings;
    },
    formatPrice(number) {
      return wNumb({
        decimals: 0,
        thousand: " "
      }).to(number);
    },
    toggleDetails() {
      this.isOpenDetails = !this.isOpenDetails;
    },
    editCalculation() {
      this.$store.dispatch("editCalculation", { name: this.name });
    },
    copyCalculation() {
      this.$store.dispatch("copyCalculation", { name: this.name });
    },
    deleteCalculation() {
      this.$store.dispatch("deleteCalculation", { name: this.name });
    },
    updateDiscount(val) {
      const index = this.$store.getters.calculationList.findIndex(item => {
        return item.name === this.item.name;
      });

      this.$store.dispatch("updateCalculationDiscount", {
        discount: val,
        currentCalc: index
      });
    }
  }
};
</script>
