<template>
  <div class="home">
    <div class="home__left">
      <div class="home__title">ЭТО<b>ПРОСЧЕТ</b></div>
      <form class="home__auth" @submit.prevent="submitHandler">
        <label class="home__label">
          <span>Email</span>
          <input type="email" v-model="email" class="home__input" required />
        </label>
        <label class="home__label">
          <span>Пароль</span>
          <input
            type="password"
            v-model="password"
            class="home__input"
            required
          />
        </label>
        <button class="btn home__btn" type="submit" :disabled="isSend">
          Войти
        </button>
      </form>
      <div class="home__hash">#ЭТОКУХНИ</div>
    </div>
    <div class="home__right">
      <div class="home__content">Обещал, сделай больше, чем обещал.</div>
    </div>
  </div>
</template>

<script>
import messages from "@/utils/message";

export default {
  name: "Home",
  data() {
    return {
      email: "1@gmail.com",
      password: "123123",
      isSend: false
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || "Что-то пошло не так");
    }
  },
  methods: {
    async submitHandler() {
      const formData = {
        email: this.email,
        password: this.password
      };

      try {
        await this.$store.dispatch("login", formData);
        this.$router.push("/page");
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }
};
</script>
