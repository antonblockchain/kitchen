<template>
  <div class="page">
    <div class="page__left">
      <div class="page__header">
        <div class="page__header_title">
          ЭТО<b
            >ПРОСЧЕТ <span>{{ currentCalculation.name }}</span></b
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

      <div class="page__list">
        <Corps
          v-for="(item, index) in currentCalculation['corps'].slice().reverse()"
          :key="item.id"
          :item="item"
          :id="item.id"
          :index="index"
          :isLast="currentCalculation['corps'].length !== index + 1"
        />

        <Facades
          v-for="(item, index) in currentCalculation['facades']
            .slice()
            .reverse()"
          :key="item.id"
          :item="item"
          :id="item.id"
          :index="index"
          :isLast="currentCalculation['facades'].length !== index + 1"
        />

        <div v-for="category in listCategory" :key="category">
          <Other
            v-for="(item, index) in currentCalculation[category]
              .slice()
              .reverse()"
            :key="item.id"
            :item="item"
            :id="item.id"
            :index="index"
            :isLast="currentCalculation[category].length !== index + 1"
            :title="namesCategory[category]"
            :category="category"
          />
        </div>
      </div>
    </div>
    <div class="page__right">
      <pre
        v-if="0"
        style="line-height: 1;font-size: 0;position: fixed;right: 0;top: 45%;overflow: auto;
          background: rgba(255, 255, 255, 0.95);padding: 1rem 2rem;width: 39rem;z-index: 100;
          bottom: 8rem;"
      >
        <small>
          <code style="font-size: 1.1rem">
            {{ currentOrder }}
          </code>
        </small>
      </pre>

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
        <button
          class="calc__order btn"
          type="button"
          :disabled="currentOrder.list.length > 1"
          @click="goToOrder"
        >
          ОФОРМИТЬ ДОГОВОР
        </button>
        <button
          class="btn"
          type="button"
          :disabled="currentOrder.list.length > 1"
        >
          СФОРМИРОВАТЬ КП
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Corps from "@/components/Items/Corps";
import Facades from "@/components/Items/Facades";
import CalcItem from "@/components/Calc-item";
import wNumb from "wnumb";
import Other from "@/components/Items/Other";
import ItemTemplate from "@/utils/ItemTemplate";

export default {
  name: "Page",
  components: { Other, Corps, Facades, CalcItem },
  data() {
    return {
      order: 0,
      user: null,
      time: null
    };
  },
  computed: {
    listCategory() {
      return ItemTemplate.listCategory().splice(2);
    },
    namesCategory() {
      return ItemTemplate.namesCategory();
    },
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
    formatOrder() {
      return wNumb({
        thousand: "-"
      }).to(this.order);
    },
    extra: {
      get() {
        return this.currentOrder.extra;
      },
      set(val) {
        this.updateExtra(Math.min(Math.max(val, 0), 100));
      }
    }
  },
  watch: {
    user() {
      this.updateName();
    }
  },
  created() {
    this.$store.dispatch("fetchOptions");
    const { order, user, time } = this.currentOrder;
    this.order = order;
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
    },
    // updateInfo() {
    //   const { order, user, time } = this.currentOrder;
    //   this.order = order;
    //   this.user = user;
    //   this.time = time;
    // },
    updateName() {
      this.$store.dispatch("updateOrderName", {
        order: this.order,
        user: this.user
      });
    },
    updateExtra(val) {
      this.$store.dispatch("updateOrderExtra", { extra: val });
    },
    goToOrder() {
      this.$router.push("/order");
    }
  }
};
</script>
