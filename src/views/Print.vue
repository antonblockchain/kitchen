<template>
  <div class="print">
    <div class="print__item">
      <div class="page__header page__header-inside">
        <div class="page__header_title">
          ЭТО<b
            >ПРОСЧЕТ <span>{{ name }}</span>
          </b>
        </div>
        <div class="page__header_info">
          Заявка #{{ formatOrder
          }}<span
            >-
            <span class="page__header_name">{{ extra }}</span>
          </span>
          Для
          <span class="page__header_name">{{ user }}</span>
          от {{ time }}
        </div>
      </div>

      <div class="calc__item">
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
      <img v-if="shopper.file" :src="shopper.file" alt="img" />
    </div>
    <div class="print__info">
      <img :src="manager.url" :alt="manager.name" />
      <p>
        <b>{{ manager.position }}</b>
      </p>
      <h3>{{ manager.name }}</h3>
      <p>
        <b v-for="item in manager.phone.split(',')" :key="item">
          {{ item }}
          <br />
        </b>
      </p>
      <p>
        <b>{{ manager.email }}</b>
      </p>

      <table class="print__table">
        <tr>
          <th>Фамилия</th>
          <td>{{ shopper.lastName }}</td>
        </tr>
        <tr>
          <th>Имя</th>
          <td>{{ shopper.firstName }}</td>
        </tr>
        <tr>
          <th>Отчество</th>
          <td>{{ shopper.middleName }}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{{ shopper.email }}</td>
        </tr>
        <tr v-for="item in shopper.number" :key="item.id">
          <th>Телефон</th>
          <td>{{ item.tel }}</td>
        </tr>
        <tr>
          <th>Город, Улица</th>
          <td>{{ shopper.address.city }}</td>
        </tr>
        <tr>
          <th>Квартира</th>
          <td>{{ shopper.address.flat }}</td>
        </tr>
        <tr>
          <th>Подъезд</th>
          <td>{{ shopper.address.entrance }}</td>
        </tr>
        <tr>
          <th>Этаж</th>
          <td>{{ shopper.address.floor }}</td>
        </tr>
        <tr>
          <th>Комментарий</th>
          <td>{{ shopper.address.comment }}</td>
        </tr>
        <tr>
          <th>Дата отгрузки</th>
          <td>{{ shopper.date }}</td>
        </tr>
        <tr>
          <th>Тип оплати</th>
          <td>{{ shopper.pay }}</td>
        </tr>
      </table>

      <button class="print__btn btn btn-block" type="button" @click="print">
        Печать
      </button>
      <br /><br />
      <button class="print__btn btn btn-block" type="button" @click="back">
        Назад
      </button>
    </div>
  </div>
</template>

<script>
import wNumb from "wnumb";
import LayersItem from "@/components/Layers-item";
import ItemTemplate from "@/utils/ItemTemplate";

export default {
  name: "Order",
  components: { LayersItem },
  data() {
    return {
      dataInfo: "-",
      isOpenDetails: false,
      showPrintBtn: true
    };
  },
  computed: {
    manager() {
      return this.$store.getters.manager;
    },
    shopper() {
      return this.$store.getters.currentOrder.shopper;
    },
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
      return Math.round((this.prepay / this.total) * 100);
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
    },
    print() {
      this.showPrintBtn = false;
      setTimeout(() => {
        window.print();
      }, 1);
    },
    back() {
      this.$router.push("/order");
    }
  }
};
</script>
