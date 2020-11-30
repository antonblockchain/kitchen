<template>
  <div class="page__left">
    <div class="page__header">
      <div class="page__header_title"><b>ОФОРМИТЬ ЗАКАЗ</b></div>
      <router-link class="page__header_back" to="/page">
        ВЕРНУТЬСЯ К ЗАЯВКЕ
      </router-link>
    </div>
    <pre
      v-if="0"
      style="line-height: 1;font-size: 0;position: fixed;left: 0;top: 10%;overflow: auto;
          background: rgba(255, 255, 255, 0.95);padding: 1rem 2rem;width: 40rem;z-index: 100;
          bottom: 8rem;text-align: left"
    >
      <small>
        <code style="font-size: 1.1rem">
          {{ currentOrder }}
        </code>
      </small>
    </pre>

    <div class="order">
      <div class="order__title">1. Личные данные</div>
      <div class="order__row">
        <label class="order__label">
          <input
            type="text"
            class="order__input page__input"
            :class="{ empty: lastName.length === 0 }"
            placeholder="Фамилия"
            v-model="lastName"
          />
        </label>
        <label class="order__label">
          <input
            type="text"
            class="order__input page__input"
            placeholder="Имя"
            v-model="firstName"
            :class="{ empty: firstName.length === 0 }"
          />
        </label>
        <label class="order__label">
          <input
            type="text"
            class="order__input page__input"
            placeholder="Отчество"
            v-model="middleName"
            :class="{ empty: middleName.length === 0 }"
          />
        </label>
      </div>
      <label class="order__label">
        <input
          type="email"
          class="order__input page__input"
          placeholder="Электронная почта"
          v-model="email"
          :class="{ empty: email.length === 0 }"
        />
      </label>

      <ShopperNumber
        v-for="(item, index) in number"
        :key="item.id"
        :item="item"
        :index="index"
        :isLast="number.length === index + 1"
      />
      <div class="order__title">2. Информация по адресу</div>

      <label class="order__label">
        <input
          type="text"
          class="order__input page__input"
          placeholder="Область, Город, Улица, Дом, Строение / Корпус"
          v-model="city"
          :class="{ empty: city.length === 0 }"
        />
      </label>

      <div class="order__row">
        <label class="order__label">
          <input
            type="text"
            class="order__input page__input"
            placeholder="Квартира / Офис"
            v-model="flat"
            :class="{ empty: flat.length === 0 }"
          />
        </label>
        <label class="order__label">
          <input
            type="text"
            class="order__input page__input"
            placeholder="Подъезд"
            v-model="entrance"
            :class="{ empty: entrance.length === 0 }"
          />
        </label>
        <label class="order__label">
          <input
            type="text"
            class="order__input page__input"
            placeholder="Этаж"
            v-model="floor"
            :class="{ empty: floor.length === 0 }"
          />
        </label>
      </div>
      <label class="order__label">
        <textarea
          class="order__input order__textarea page__input"
          placeholder="Комментарий к адресу"
          v-model="comment"
          :class="{ empty: comment.length === 0 }"
        ></textarea>
      </label>

      <label class="order__label">
        <input
          type="date"
          class="order__input page__input"
          placeholder="Дата планируемой отгрузки"
          v-model="date"
          :class="{ empty: date.length === 0 }"
        />
      </label>

      <div class="order__title">3. Дополнительная информация</div>

      <ShopperFile />

      <label class="order__label">
        <select
          class="order__input page__input"
          :class="{ empty: pay.length === 0 }"
          v-model="pay"
        >
          <option value="" disabled hidden>Тип оплати</option>
          <option value="Тип оплаты 1">Тип оплаты 1</option>
          <option value="Тип оплаты 2">Тип оплаты 2</option>
          <option value="Тип оплаты 3">Тип оплаты 3</option>
        </select>
      </label>
    </div>
    <div class="calc__bottom">
      <button class="btn" type="button" @click="goToPrint" :disabled="true">
        ПЕЧАТЬ ДОГОВОРА
      </button>
      <button class="calc__order btn" type="button" @click="goToMain">
        ОФОРМИТЬ ЗАКАЗ
      </button>
    </div>
  </div>
</template>

<script>
import ShopperFile from "@/components/Shopper-file";
import ShopperNumber from "@/components/Shopper-number";

export default {
  name: "Shopper",
  components: { ShopperFile, ShopperNumber },
  // data() {
  //   return {
  //     firstName: ""
  //   };
  // },
  computed: {
    currentOrder() {
      return this.$store.getters.currentOrder;
    },
    shopperInfo() {
      return this.currentOrder.shopper;
    },
    firstName: {
      get() {
        return this.shopperInfo.firstName;
      },
      set(val) {
        this.shopperInfo.firstName = val;
      }
    },
    lastName: {
      get() {
        return this.shopperInfo.lastName;
      },
      set(val) {
        this.shopperInfo.lastName = val;
      }
    },
    middleName: {
      get() {
        return this.shopperInfo.middleName;
      },
      set(val) {
        this.shopperInfo.middleName = val;
      }
    },
    email: {
      get() {
        return this.shopperInfo.email;
      },
      set(val) {
        this.shopperInfo.email = val;
      }
    },
    number: {
      get() {
        return this.shopperInfo.number;
      },
      set(val) {
        this.shopperInfo.number = val;
      }
    },
    city: {
      get() {
        return this.shopperInfo.address.city;
      },
      set(val) {
        this.shopperInfo.address.city = val;
      }
    },
    flat: {
      get() {
        return this.shopperInfo.address.flat;
      },
      set(val) {
        this.shopperInfo.address.flat = val;
      }
    },
    entrance: {
      get() {
        return this.shopperInfo.address.entrance;
      },
      set(val) {
        this.shopperInfo.address.entrance = val;
      }
    },
    floor: {
      get() {
        return this.shopperInfo.address.floor;
      },
      set(val) {
        this.shopperInfo.address.floor = val;
      }
    },
    comment: {
      get() {
        return this.shopperInfo.address.comment;
      },
      set(val) {
        this.shopperInfo.address.comment = val;
      }
    },
    date: {
      get() {
        return this.shopperInfo.date;
      },
      set(val) {
        this.shopperInfo.date = val;
      }
    },
    file: {
      get() {
        return this.shopperInfo.file;
      },
      set(val) {
        this.shopperInfo.file = val;
      }
    },
    pay: {
      get() {
        return this.shopperInfo.pay;
      },
      set(val) {
        this.shopperInfo.pay = val;
      }
    }
  },
  methods: {
    goToPrint() {
      this.$router.push("/print");
    },
    goToMain() {
      this.$router.push("/main");
    }
  }
};
</script>
