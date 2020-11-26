<template>
  <div class="page page-order">
    <div class="page__left page__left-dark">
      <div class="page__header page__header-inside">
        <div class="page__header_title">
          ЭТО<b
            >ПРОСЧЕТ <span>{{ name }}</span></b
          >
        </div>
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
                v-model="discount"
                placeholder="0"
                v-mask="'##'"
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
          <div class="calc__head_title">ПРОСЧЕТ <span>А</span></div>
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
                :isOrder="false"
              />
            </ul>
          </div>

          ===
          <ul class="calc__list">
            <li class="calc__row">
              <div class="calc__name">
                <b>Мтериал корпуса:</b> Базовый, Серый
              </div>
              <div class="calc__size">20 м<sup>2</sup></div>
              <div class="calc__interest color-red">100%</div>
              <div class="calc__price">34 000 ₽</div>
            </li>
          </ul>
          ====

          <div class="calc__total calc__total-big">
            <div class="calc__total_title">ИТОГО:</div>
            <div v-if="discount > 0" class="calc__total_price">
              {{ formatPrice(total) }} ₽<sup>-{{ discount }}%</sup>
              <del>{{ finalPrice }} ₽</del>
            </div>
            <div v-else class="calc__total_price">{{ total }} ₽</div>
          </div>
          <div class="calc__row">
            <div class="calc__name color-red">Предоплата</div>
            <div class="calc__interest color-red">35%</div>
            <div class="calc__price color-red">334 000 ₽</div>
          </div>
          <div class="calc__row">
            <div class="calc__name">Постоплата</div>
            <div class="calc__interest">65%</div>
            <div class="calc__price">519 000 ₽</div>
          </div>
        </div>
      </div>

      <div class="layers">
        <button class="layers__top" type="button" @click="toggleDetails">
          <span class="icon icon-layers"></span>
        </button>
        <div v-if="isOpenDetails" class="layers__list">
          <ul v-for="cat in categoryList" :key="cat">
            <LayersItem
              v-for="(item, index) in currentItem[cat].slice().reverse()"
              :key="item.id"
              :title="categoryName[cat]"
              :item="item"
              :index="index"
              :category="cat"
            />
          </ul>
        </div>
      </div>
    </div>

    <div class="page__left">
      <div class="page__header">
        <div class="page__header_title"><b>ОФОРМИТЬ ЗАКАЗ</b></div>
        <a class="page__header_back" href="/#">
          ВЕРНУТЬСЯ К ЗАЯВКЕ
        </a>
      </div>
      <pre v-if="0" style="text-align: left">
        <small>
          <code style="font-size: 1.1rem">
            {{ dataInfo }}
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
              placeholder="Фамилия"
            />
          </label>
          <label class="order__label">
            <input
              type="text"
              class="order__input page__input"
              placeholder="Имя"
            />
          </label>
          <label class="order__label">
            <input
              type="text"
              class="order__input page__input"
              placeholder="Отчество"
            />
          </label>
        </div>
        <label class="order__label">
          <input
            type="email"
            class="order__input page__input"
            placeholder="Электронная почта"
          />
        </label>
        <div class="order__tel">
          <label class="order__label">
            <input
              type="tel"
              class="order__input page__input"
              placeholder="Номер телефона"
            />
          </label>
          <button class="page__btn page__btn-grey btn empty" type="button">
            <span class="icon icon-plus"></span>
          </button>
        </div>

        <div class="order__title">2. Информация по адресу</div>

        <label class="order__label">
          <input
            type="text"
            class="order__input page__input"
            placeholder="Область, Город, Улица, Дом, Строение / Корпус"
          />
        </label>

        <div class="order__row">
          <label class="order__label">
            <input
              type="text"
              class="order__input page__input"
              placeholder="Квартира / Офис"
            />
          </label>
          <label class="order__label">
            <input
              type="text"
              class="order__input page__input"
              placeholder="Подъезд"
            />
          </label>
          <label class="order__label">
            <input
              type="text"
              class="order__input page__input"
              placeholder="Этаж"
            />
          </label>
        </div>
        <label class="order__label">
          <textarea
            class="order__input order__textarea page__input empty"
            placeholder="Комментарий к адресу"
          ></textarea>
        </label>

        <label class="order__label">
          <input
            type="text"
            class="order__input page__input empty"
            placeholder="Дата планируемой отгрузки"
          />
        </label>

        <div class="order__title">3. Дополнительная информация</div>

        <label class="order__file order__label empty">
          <input type="file" class="order__file_input" />
          <span class="order__file_content">
            <svg
              width="32"
              height="40"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-53 1 511 511.999"
              fill="#d9d9d9"
            >
              <path
                d="M276.41 3.957C274.062 1.484 270.844 0 267.508 0H67.778C30.921 0 .5 30.3.5 67.152v377.692C.5 481.699 30.922 512 67.777 512h271.086c36.856 0 67.278-30.3 67.278-67.156V144.94c0-3.214-1.485-6.304-3.586-8.656zm3.586 39.7l84.469 88.671h-54.91c-16.325 0-29.559-13.11-29.559-29.433zm58.867 443.609H67.777c-23.125 0-42.543-19.168-42.543-42.422V67.152c0-23.125 19.293-42.418 42.543-42.418h187.485v78.16c0 30.051 24.242 54.168 54.293 54.168h71.851v287.782c0 23.254-19.293 42.422-42.543 42.422zm0 0"
              />
              <path
                d="M305.102 401.934H101.539c-6.8 0-12.367 5.562-12.367 12.367 0 6.8 5.566 12.367 12.367 12.367h203.688c6.8 0 12.367-5.566 12.367-12.367 0-6.805-5.567-12.367-12.492-12.367zM140 268.863l50.953-54.789v135.051c0 6.8 5.567 12.367 12.367 12.367 6.805 0 12.368-5.566 12.368-12.367v-135.05l50.953 54.788c2.472 2.594 5.691 3.957 9.027 3.957 2.969 0 6.062-1.113 8.41-3.34 4.95-4.699 5.32-12.492.621-17.437l-72.472-77.79c-2.352-2.472-5.567-3.956-9.028-3.956-3.465 0-6.68 1.484-9.027 3.957l-72.473 77.789c-4.699 4.945-4.328 12.86.617 17.437 5.196 4.7 12.985 4.329 17.684-.617zm0 0"
              />
            </svg>
            <span>Прикрепить файл</span>
          </span>
        </label>

        <label class="order__label">
          <select class="order__input page__input empty">
            <option value="Тип оплаты">Тип оплаты</option>
            <option value="Тип оплаты">Тип оплаты</option>
            <option value="Тип оплаты">Тип оплаты</option>
          </select>
        </label>
      </div>

      <div class="calc__bottom">
        <button class="btn" type="button">ПЕЧАТЬ ДОГОВОРА</button>
        <button class="calc__order btn" type="button">ОФОРМИТЬ ЗАКАЗ</button>
      </div>
    </div>
  </div>
</template>

<script>
import wNumb from "wnumb";
import CalcSibling from "@/components/Calc-sibling";
import LayersItem from "@/components/Layers-item";
import ItemTemplate from "@/utils/ItemTemplate";

export default {
  name: "Order",
  components: { LayersItem, CalcSibling },
  data() {
    return {
      dataInfo: "-",
      isOpenDetails: !false,
      user: null
    };
  },
  computed: {
    finalPrice() {
      return this.formatPrice((this.total * (100 - this.discount)) / 100);
    },
    total() {
      return this.currentItem.total;
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
      return this.currentOrder.name;
    },
    time() {
      return this.currentOrder.time;
    },
    discount: {
      get() {
        return this.currentItem.discount;
      },
      set(val) {
        this.updateDiscount(val);
      }
    },
    formatOrder() {
      return wNumb({
        thousand: "-"
      }).to(this.currentOrder.order);
    }
  },
  methods: {
    toggleDetails() {
      this.isOpenDetails = !this.isOpenDetails;
    },
    updateDiscount(val) {
      this.$store.dispatch("updateCalculationDiscount", {
        discount: val,
        currentCalc: this.$store.getters.currentNumberCalculation
      });
    },
    formatPrice(number) {
      return wNumb({
        decimals: 0,
        thousand: " "
      }).to(number);
    }
  },
  mounted() {
    // const id = "1DeEdfoquoLnBIczmX_6wg7bwwtFeQOPDHO-BMtAVDtg";
    // axios
    //   .get(
    //     `https://spreadsheets.google.com/feeds/cells/${id}/1/public/full?alt=json`
    //   )
    //   .then(res => {
    //     const { data } = res;
    //     const newArr = [];
    //     console.log(data.feed.entry);
    //     data.feed.entry.splice(3).forEach((item, index) => {
    //       let value = item["gs$cell"]["inputValue"];
    //       if (index % 3 === 0) {
    //         newArr.push({ name: value });
    //       } else if (index % 2 === 0) {
    //         newArr[newArr.length - 1].type = value;
    //       } else {
    //         newArr[newArr.length - 1].price = value;
    //       }
    //       console.log(item);
    //     });
    //     console.log(newArr);
    //     this.dataInfo = newArr;
    //   })
    //   .catch(e => console.log(e));
  }
};
</script>

<style scoped></style>
