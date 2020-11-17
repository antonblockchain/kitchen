<template>
  <div class="calc__item">
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
              v-mask="'##'"
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
      <ul class="calc__list">
        <CalcSibling
          v-for="(item, index) in corpsList.slice().reverse()"
          :key="item.id"
          :title="'Материал корпуса'"
          :item="item"
          :index="index"
          :category="'corps'"
          :letter="name"
        />
        <CalcSibling
          v-for="(item, index) in facadesList.slice().reverse()"
          :key="item.id"
          :title="'Комплект фасадов'"
          :item="item"
          :index="index"
          :category="'facades'"
          :letter="name"
        />
      </ul>

      <div class="calc__total">
        <div class="calc__total_title">ИТОГО:</div>
        <div v-if="discount > 0" class="calc__total_price">
          {{ finalPrice }} ₽<sup>-{{ discount }}%</sup>
          <del>{{ formatPrice(total) }} ₽</del>
        </div>
        <div v-else class="calc__total_price">{{ total }} ₽</div>
      </div>

      <div class="layers">
        <button class="layers__top" type="button" @click="toggleDetails">
          <span class="icon icon-layers"></span>
        </button>
        <ul v-if="isOpenDetails" class="layers__list">
          <LayersItem
            v-for="(item, index) in corpsList.slice().reverse()"
            :key="item.id"
            :title="'Материал корпуса'"
            :item="item"
            :index="index"
            :category="'corps'"
          />
          <LayersItem
            v-for="(item, index) in facadesList.slice().reverse()"
            :key="item.id"
            :title="'Комплект фасадов'"
            :item="item"
            :index="index"
            :category="'facades'"
          />
        </ul>
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

export default {
  name: "Calc-item",
  components: { LayersItem, CalcSibling },
  props: {
    item: Object,
    index: Number
  },
  data() {
    return {
      isOpenContent: true,
      isOpenSettings: !false,
      isOpenDetails: false,
      name: this.item.name,
      discount: this.item.discount
    };
  },
  watch: {
    // discount(value) {
    //   const num = parseInt(value);
    //   if (num > 100) {
    //     this.discount = 100;
    //   }
    // }
  },
  computed: {
    finalPrice() {
      return this.formatPrice((this.total * (100 - this.discount)) / 100);
    },
    corpsList() {
      return this.item.corps;
    },
    facadesList() {
      return this.item.facades;
    },
    total() {
      return this.item.total;
    }
    // discount() {
    //   return this.item.discount;
    // }
    // currentItem() {
    //   return this.$store.getters.calculationList[this.index];
    // }
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
    }
  }
};
</script>
