<template>
  <div class="print__item">
    <div class="print__wr">
      <div class="calc__item calc__item-print">
        <div class="calc__head">
          <div class="calc__head_title">
            ПРОСЧЕТ <span>{{ name }}</span>
          </div>
        </div>
        <div class="calc__content">
          <ul v-for="cat in categoryList" :key="cat">
            <LayersItem
              v-for="(item, index) in currentItem[cat].slice().reverse()"
              :key="item.id"
              :title="categoryName[cat]"
              :item="item"
              :index="index"
              :category="cat"
              :isOrder="true"
            />
          </ul>

          <div class="calc__total">
            <div class="calc__total_title">ИТОГО:</div>
            <div class="calc__total_price">{{ formatPrice(total) }} ₽</div>
          </div>
        </div>
      </div>
      <PrintManager />
    </div>

    <div class="calc__gallery">
      <img
        v-show="photo.length > 0"
        v-for="img in photo"
        :key="img"
        :src="img"
        alt="img"
        style="width: 100%"
      />
    </div>
  </div>
</template>

<script>
import LayersItem from "@/components/Layers-item";
import PrintManager from "@/components/Print-manager";
import ItemTemplate from "@/utils/ItemTemplate";
import wNumb from "wnumb";

export default {
  name: "Print-item",
  props: {
    currentItem: Object
  },
  components: { PrintManager, LayersItem },
  computed: {
    categoryList() {
      return ItemTemplate.listCategory();
    },
    categoryName() {
      return ItemTemplate.namesCategory();
    },
    // currentItem() {
    //   return this.$store.getters.currentCalculation;
    // },
    name() {
      return this.currentItem.name;
    },
    finalPrice() {
      return this.formatPrice((this.total * (100 - this.discount)) / 100);
    },
    total() {
      return this.currentItem.total * this.coefficient;
    },
    coefficient() {
      return (
        (1 + this.$store.getters.currentOrder.extra / 100) *
        (1 - this.discount / 100)
      );
    },
    discount() {
      return this.currentItem.discount;
    },
    photo() {
      return this.currentItem.photo;
    }
  },
  methods: {
    formatPrice(number) {
      return wNumb({
        decimals: 0,
        thousand: " "
      }).to(number);
    }
  }
};
</script>

<style scoped></style>
