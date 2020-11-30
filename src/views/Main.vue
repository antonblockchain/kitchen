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
    <pre v-if="1" style="font-size: 1rem">
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
import axios from "axios";

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
  },
  mounted() {
    this.$store.dispatch("fetchOptions");

    const id = "1DeEdfoquoLnBIczmX_6wg7bwwtFeQOPDHO-BMtAVDtg";
    axios
      .get(
        `https://spreadsheets.google.com/feeds/cells/${id}/1/public/full?alt=json`
      )
      .then(res => {
        const newArr = [];
        res.data.feed.entry.splice(5).forEach(item => {
          const cell = item["gs$cell"];
          if (cell["row"] > newArr.length + 1) {
            newArr.push({ email: cell["inputValue"] });
          }
          switch (cell["col"]) {
            case "2":
              newArr[newArr.length - 1].name = cell["inputValue"];
              break;
            case "3":
              newArr[newArr.length - 1].position = cell["inputValue"];
              break;
            case "4":
              newArr[newArr.length - 1].phone = cell["inputValue"];
              break;
            case "5":
              newArr[newArr.length - 1].url = cell["inputValue"];
              break;
          }
        });
        newArr.some(item => {
          if (item.email === this.$store.getters.manager.email) {
            this.$store.getters.manager.name = item.name;
            this.$store.getters.manager.position = item.position;
            this.$store.getters.manager.phone = item.phone;
            this.$store.getters.manager.url = item.url;
            return true;
          }
          return false;
        });
      })
      .catch(e => console.log(e));
  }
};
</script>

<style scoped></style>
