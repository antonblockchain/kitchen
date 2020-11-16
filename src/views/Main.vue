<template>
  <div class="lc">
    <div class="lc__top">
      <div class="lc__title page__header_title">ЭТО<b>ПРОСЧЕТ</b></div>
      <div class="lc__name">Ткаченко Владислав</div>
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
          <span>{{ item.user }}</span> от
          {{ item.time }}
        </button>
      </li>
    </ul>
    <button class="lc__btn btn btn-block" type="button" @click="addOrder">
      <span class="icon icon-plus"></span>
    </button>
    <pre style="font-size: 1rem">
      <code>
        {{ orderList }}
      </code>
    </pre>
  </div>
</template>

<script>
import wNumb from "wnumb";

export default {
  name: "Main",
  computed: {
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
    openOrder(id) {
      console.log("openOrder", id);
    },
    addOrder() {
      console.log("add order");
    }
  }
};
</script>

<style scoped></style>
