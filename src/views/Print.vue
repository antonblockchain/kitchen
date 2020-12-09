<template>
  <div class="print">
    <div class="page__header page__header-inside">
      <router-link to="/main" class="page__header_title">
        ЭТО<b>ПРОСЧЕТ</b>
      </router-link>
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
</template>

<script>
import wNumb from "wnumb";
import PrintItem from "@/components/Print-item";

export default {
  name: "Order",
  components: { PrintItem },
  data() {
    return {
      isOpenDetails: false
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
  }
};
</script>
