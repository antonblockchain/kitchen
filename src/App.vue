<template>
  <fragment>
    <!--    <div id="nav" v-if="isLogin">-->
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/main">Main</router-link>
      |
      <router-link to="/page">Page</router-link>
      |
      <router-link to="/order">Order</router-link>
      |
      <router-link to="/print">Print</router-link>
      |
      <button type="button" @click="logout">logout</button>
      isLogin: {{ isLogin }} | userId : {{ id }}
    </div>
    <router-view />
  </fragment>
</template>

<script>
import firebase from "firebase/app";
import messages from "@/utils/message";
import { Fragment } from "vue-fragment";

export default {
  name: "App",
  components: { Fragment },
  data() {
    return {
      id: "",
      isLogin: false
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/");
      this.$message(messages["logout"]);
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(async user => {
      this.isLogin = !!user;
      this.id = await this.$store.dispatch("getUid");
    });
  },
  async mounted() {
    try {
      this.id = await this.$store.dispatch("getUid");
    } catch (e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss">
@import "assets/scss/main";

#nav {
  position: fixed;
  background: rgba(#fff, 0.8);
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
  padding: 15px 10px;
  box-shadow: 0 0 1rem #2c3e50;
  z-index: 1000;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
