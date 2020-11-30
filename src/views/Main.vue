<template>
  <div class="lc">
    <div class="lc__top">
      <div class="lc__title page__header_title">ЭТО<b>ПРОСЧЕТ</b></div>
      <div class="lc__name">{{ managerName }}</div>
    </div>
    <ul class="lc__list">
      <li>
        <button
          v-for="item in orderList"
          class="lc__item"
          :key="item.order"
          type="button"
          @click="openOrder(item.order)"
        >
          Заявка #<span>{{ formatId(item.order) }}</span> для
          <span>{{ formatName(item.user) }}</span> от
          {{ item.time }}
        </button>
      </li>
    </ul>
    <button class="lc__btn btn btn-block" type="button" @click="addOrder">
      <span class="icon icon-plus"></span>
    </button>
    <pre v-if="0" style="font-size: 1rem">
      <code>
<!--        {{ $store.getters.allState.currentOrder }}-->
<!--        {{ orderList }}-->
        {{$store.getters.getOptions}}
      </code>
    </pre>
  </div>
</template>

<script>
import wNumb from "wnumb";

export default {
  name: "Main",
  computed: {
    managerName() {
      return this.$store.getters.manager.name;
    },
    orderList() {
      return this.$store.getters.orderList;
    }
  },
  methods: {
    formatId(id) {
      return wNumb({
        thousand: "-"
      }).to(id);
    },
    formatName(name) {
      return name ? name : "Без имени";
    },
    openOrder(id) {
      this.$store.dispatch("setOrder", id);
      this.$router.push("/page");
    },
    addOrder() {
      this.$store.dispatch("addOrder");
    }
  }
};
</script>
