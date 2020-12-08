<template>
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
</template>

<script>
export default {
  name: "Print-manager",
  computed: {
    manager() {
      return this.$store.getters.manager;
    }
  },
  methods: {
    print() {
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

<style scoped></style>
