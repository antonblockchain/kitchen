<template>
  <div>
    <div class="page">
      <div class="page__left">
        <div class="page__header">
          <div class="page__header_title">
            ЭТО<b>
              ПРОСЧЕТ <span>{{ currentCalculation.name }}</span>
            </b>
          </div>
          <div class="page__header_info">
            Заявка #<span>{{ order }}</span> Для
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

        <div class="page__list">
          <Corps
            v-for="(item, index) in corpsList.slice().reverse()"
            :key="item.id + 11"
            :item="item"
            :id="item.id"
            :index="index"
            :isLast="corpsList.length !== index + 1"
          />

          <Facades
            v-for="(item, index) in facadesList.slice().reverse()"
            :key="item.id + 2"
            :item="item"
            :id="item.id"
            :index="index"
            :isLast="facadesList.length !== index + 1"
          />

          <div hidden>
            <div class="page__item">
              <label class="page__label page__label-large">
                <span class="page__text">Комплект фасадов</span>
                <span class="page__label_w">
                  <input type="text" class="page__input" placeholder="" />
                  <span class="icon icon-search"></span>
                </span>
              </label>
              <label class="page__label page__label-color">
                <span class="page__text">Цвет</span>
                <input type="text" class="page__input" placeholder="" />
              </label>
              <label class="page__label">
                <span class="page__text">М<sup>2</sup></span>
                <input type="text" class="page__input" placeholder="" />
              </label>
              <button class="page__btn btn" type="button">
                <span class="icon icon-layers"></span>
              </button>
            </div>

            <div class="page__item page__item-black">
              <label class="page__label page__label-large">
                <span class="page__text">Комплект фасадов 2</span>
                <span class="page__label_w">
                  <input type="text" class="page__input" placeholder="" />
                  <span class="icon icon-search"></span>
                </span>
              </label>
              <label class="page__label page__label-color">
                <span class="page__text">Цвет</span>
                <input type="text" class="page__input" placeholder="" />
              </label>
              <label class="page__label">
                <span class="page__text">М<sup>2</sup></span>
                <input type="text" class="page__input" placeholder="" />
              </label>
              <button class="page__btn page__btn-black btn" type="button">
                <span class="icon icon-layers"></span>
              </button>
              <button class="page__btn page__btn-grey btn" type="button">
                <span class="icon icon-plus"></span>
              </button>
            </div>

            <div class="page__item page__item-red">
              <label class="page__label page__label-type">
                <span class="page__text">Тип</span>
                <span class="page__label_select">
                  <select class="page__select js-select">
                    <option value="Без типа">Без типа</option>
                    <option value="Без типа">Без типа</option>
                    <option value="Без типа">Без типа</option>
                    <option value="Без типа">Без типа</option>
                  </select>
                </span>
              </label>
              <label class="page__label page__label-article">
                <span class="page__text">Артикул</span>
                <input type="text" class="page__input" placeholder="" />
              </label>
              <label class="page__label">
                <span class="page__text">Ширина</span>
                <input type="text" class="page__input" placeholder="" />
              </label>
              <label class="page__label">
                <span class="page__text">Высота</span>
                <input type="text" class="page__input" placeholder="" />
              </label>
              <label class="page__label page__label-res">
                <span class="page__text">М<sup>2</sup></span>
                <input type="text" class="page__input" readonly />
              </label>
            </div>

            <div class="page__item">
              <label class="page__label page__label-fill">
                <span class="page__text">Фурнитура Петли</span>
                <span class="page__label_w">
                  <input type="text" class="page__input" placeholder="" />
                  <span class="icon icon-search"></span>
                </span>
              </label>
              <label class="page__label page__label-count">
                <span class="page__text">Кол-во</span>
                <input type="text" class="page__input" placeholder="" />
              </label>
              <button class="page__btn page__btn-light btn" type="button">
                <span class="icon icon-plus"></span>
              </button>
            </div>
            <div class="page__item">
              <label class="page__label page__label-fill">
                <span class="page__text">Столешница</span>
                <span class="page__label_w">
                  <input type="text" class="page__input" placeholder="" />
                  <span class="icon icon-search"></span>
                </span>
              </label>
              <label class="page__label page__label-color">
                <span class="page__text">Цвет</span>
                <input type="text" class="page__input" placeholder="" />
              </label>
              <label class="page__label page__label-count">
                <span class="page__text">Кол-во</span>
                <input type="text" class="page__input" placeholder="" />
              </label>
              <button class="page__btn page__btn-light btn" type="button">
                <span class="icon icon-plus"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="page__right">
        <!--        <pre style="line-height: 1; font-size: 0;">-->
        <!--          <small>-->
        <!--            <code style="font-size: 1.1rem">-->
        <!--              {{ optionsList }}-->
        <!--              {{ facadesList }}-->
        <!--            </code>-->
        <!--          </small>-->
        <!--        </pre>-->
        <div class="calc">
          <CalcItem
            v-for="(calc, index) in calculationList"
            :index="index"
            :key="calc.name"
            :item="calc"
          />
        </div>

        <button
          v-if="calculationList.length < 3"
          class="calc__add btn"
          type="button"
          @click="addCalculation"
        >
          <span class="icon icon-plus"></span>
        </button>
        <div class="calc__bottom">
          <button class="calc__order btn" type="button">
            ОФОРМИТЬ ДОГОВОР
          </button>
          <button class="btn" type="button">СФОРМИРОВАТЬ КП</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Corps from "@/components/Items/Corps";
import Facades from "@/components/Items/Facades";
import CalcItem from "@/components/Calc-item";
import wNumb from "wnumb";

export default {
  name: "Page",
  components: { Corps, Facades, CalcItem },
  data() {
    return {
      order: null,
      user: null,
      time: null
    };
  },
  computed: {
    calculationList() {
      return this.$store.getters.calculationList;
    },
    optionsList() {
      return this.$store.getters.getOptions;
    },
    currentOrder() {
      return this.$store.getters.currentOrder;
    },
    currentCalculation() {
      return this.$store.getters.currentCalculation;
    },
    corpsList() {
      return this.currentCalculation["corps"];
    },
    facadesList() {
      return this.currentCalculation["facades"];
    }
  },
  created() {
    this.$store.dispatch("fetchOptions");

    const { order, user, time } = this.$store.getters.currentOrder;
    this.order = wNumb({
      thousand: "-"
    }).to(order);
    this.user = user;
    this.time = time;
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/");
    },
    addCalculation() {
      this.$store.dispatch("addCalculation");
    }
  }
};
</script>
