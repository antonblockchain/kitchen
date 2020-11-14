<template>
  <div class="calc__item">
    <div class="calc__head">
      <div class="calc__head_title">ПРОСЧЕТ <span>А</span></div>
      <div
        v-if="isOpenContent"
        class="calc__nav"
        :class="{ active: isOpenSettings }"
      >
        <div class="calc__nav_menu">
          <a href="#" class="calc__nav_link">Редактировать</a>
          <a href="#" class="calc__nav_link">Дублировать</a>
          <a href="#" class="calc__nav_link">Удалить</a>
          <a href="#" class="calc__nav_link">%</a>
        </div>
        <button class="calc__nav_toggle" type="button" @click="toggleSetiings">
          <span class="icon icon-more"></span>
        </button>
      </div>
      <button
        v-if="!isOpenContent"
        class="calc__show"
        type="button"
        @click="toggleContent"
      >
        <span class="icon icon-down"></span>
      </button>
    </div>

    <div class="calc__content" v-if="isOpenContent">
      <ul class="calc__list">
        {% for i in range(0, 7) -%}
        <li class="calc__row">
          <div class="calc__name"><b>Мтериал корпуса:</b> Базовый, Серый</div>
          <div class="calc__size">20 м<sup>2</sup></div>
          <div class="calc__price">34 000 ₽</div>
          <button class="calc__remove" type="button">
            <span class="icon icon-close"></span>
          </button>
        </li>
        {%- endfor %}
      </ul>

      <div class="calc__total">
        <div class="calc__total_title">ИТОГО:</div>
        <div class="calc__total_price">
          853 000 ₽<sup>-10%</sup>
          <del>999 000 ₽</del>
        </div>
      </div>

      <button class="calc__toggle" type="button" @click="toggleContent">
        <span class="icon icon-down"></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calc-item",
  data() {
    return {
      isOpenContent: !true,
      isOpenSettings: false
    };
  },
  methods: {
    toggleContent() {
      this.isOpenContent = !this.isOpenContent;
    },
    toggleSetiings() {
      this.isOpenSettings = !this.isOpenSettings;
    }
  }
};
</script>

<style scoped></style>
