<template>
  <div class="print">
    <div class="print__item">
      <div class="page__header page__header-inside">
        <div class="page__header_title">ЭТО<b>ПРОСЧЕТ</b></div>
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

      <PrintItem
        v-for="item in currentOrder.list"
        :key="item.name"
        :currentItem="item"
      />
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
import PrintItem from "@/components/Print-item";

export default {
  name: "Order",
  components: { PrintItem },
  data() {
    return {
      isOpenDetails: false,
      showPrintBtn: true
    };
  },
  computed: {
    manager() {
      return this.$store.getters.manager;
    },
    currentOrder() {
      return this.$store.getters.currentOrder;
    },
    user() {
      return this.currentOrder.user;
    },
    time() {
      return this.currentOrder.time;
    },
    extra() {
      return this.currentOrder.extra;
    },
    formatOrder() {
      return wNumb({
        thousand: "-"
      }).to(this.currentOrder.order);
    }
  },
  methods: {
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
