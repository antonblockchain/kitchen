<template>
  <div class="page page-order">
    <div class="page__left page__left-dark">
      <div class="page__header page__header-inside">
        <div class="page__header_title">ЭТО<b>ПРОСЧЕТ</b></div>
        <div class="page__header_info">
          Заявка #{{ formatOrder
          }}<span
            >-
            <label>
              <input
                type="text"
                class="page__header_name"
                v-autowidth="{
                  maxWidth: '20rem',
                  minWidth: '3.6rem',
                  comfortZone: 0
                }"
                v-model="extra"
                placeholder="0"
                v-mask="'###'"
                v-int
              />
            </label>
          </span>
          Для
          <label>
            <input
              type="text"
              class="page__header_name"
              v-autowidth="{
                maxWidth: '20rem',
                minWidth: '3.6rem',
                comfortZone: 0
              }"
              v-model="user"
              placeholder="ФИО"
            />
          </label>
          от {{ time }}
        </div>
      </div>

      <div class="calc__item">
        <div class="calc__head">
          <div class="calc__head_title">
            ПРОСЧЕТ <span>{{ name }}</span>
          </div>
        </div>

        <div class="calc__content">
          <div class="calc__list">
            <ul v-for="cat in categoryList" :key="cat">
              <CalcSibling
                v-for="(item, index) in currentItem[cat].slice().reverse()"
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

          <div class="calc__total calc__total-big">
            <div class="calc__total_title">ИТОГО:</div>
            <!--            <div v-if="discount > 0" class="calc__total_price">-->
            <!--              {{ formatPrice(total) }} ₽<sup>-{{ discount }}%</sup>-->
            <!--              <del>{{ finalPrice }} ₽</del>-->
            <!--            </div>-->
            <div class="calc__total_price">{{ formatPrice(total) }} ₽</div>
          </div>
          <div class="calc__row">
            <div class="calc__name color-red">Предоплата</div>
            <div class="calc__interest color-red">{{ prepayPercentages }}%</div>
            <div class="calc__price color-red">{{ formatPrice(prepay) }} ₽</div>
          </div>
          <div class="calc__row">
            <div class="calc__name">Постоплата</div>
            <div class="calc__interest">{{ 100 - prepayPercentages }}%</div>
            <div class="calc__price">{{ formatPrice(total - prepay) }} ₽</div>
          </div>
        </div>
      </div>

      <div class="layers">
        <button class="layers__top" type="button" @click="toggleDetails">
          <span class="icon icon-layers"></span>
        </button>
        <div v-if="isOpenDetails" class="layers__list">
          <ul v-for="cat in [...categoryList].splice(0, 2)" :key="cat">
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
        </div>
      </div>
    </div>

    <Shopper />
  </div>
</template>

<script>
import wNumb from "wnumb";
import CalcSibling from "@/components/Calc-sibling";
import LayersItem from "@/components/Layers-item";
import ItemTemplate from "@/utils/ItemTemplate";
import Shopper from "@/components/Shopper";

export default {
  name: "Order",
  components: { LayersItem, CalcSibling, Shopper },
  data() {
    return {
      isOpenDetails: false
    };
  },
  computed: {
    user: {
      get() {
        return this.currentOrder.user;
      },
      set(val) {
        this.currentOrder.user = val;
      }
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
    categoryList() {
      return ItemTemplate.listCategory();
    },
    categoryName() {
      return ItemTemplate.namesCategory();
    },
    currentOrder() {
      return this.$store.getters.currentOrder;
    },
    currentItem() {
      return this.$store.getters.currentCalculation;
    },
    name() {
      return this.currentItem.name;
    },
    time() {
      return this.currentOrder.time;
    },
    discount() {
      return this.currentItem.discount;
    },
    extra: {
      get() {
        return this.currentOrder.extra;
      },
      set(val) {
        this.updateExtra(Math.min(Math.max(val, 0), 100));
      }
    },
    formatOrder() {
      return wNumb({
        thousand: "-"
      }).to(this.currentOrder.order);
    },
    prepay() {
      // Пройшовся по всі категоріям і виводжу суму предоплати
      return ItemTemplate.listCategory().reduce((acc, category) => {
        return (
          acc +
          this.currentItem[category].reduce((acc, item) => {
            return acc + item.total * (item.prepay / 100);
          }, 0)
        );
      }, 0);
    },
    prepayPercentages() {
      return Math.round((this.prepay / this.total) * 100) || 0;
    }
  },
  methods: {
    toggleDetails() {
      this.isOpenDetails = !this.isOpenDetails;
    },
    updateExtra(val) {
      this.$store.dispatch("updateOrderExtra", { extra: val });
    },
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
