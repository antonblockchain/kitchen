<template>
  <div>
    <div class="page">
      <div class="page__left">
        <div class="page__header">
          <div class="page__header_title">
            ЭТО<b>ПРОСЧЕТ <span>В</span></b>
          </div>
          <div class="page__header_info">
            Заявка #231133-<span>10</span> Для
            <label>
              <span class="page__header_buffer">ФИО</span>
              <input
                type="text"
                class="page__header_name"
                value=""
                placeholder="ФИО"
              />
            </label>
            от 27.07.2020
          </div>
        </div>

        <div class="page__list">
          <PageItem
            v-for="(item, index) in list.slice().reverse()"
            :key="item.id"
            :item="item"
            :id="item.id"
            :index="index"
            :isLast="list.length !== index + 1"
          />

          <div hidden>
            <div class="page__item">
              <label class="page__label page__label-large">
                <span class="page__text">Комплект фасадов</span>
                <span class="page__label_w">
                  <input type="text" class="page__input" placeholder="" />
                  <span class="icon icon-search"></span>
                </span>
              </label>
              <label class="page__label page__label-color">
                <span class="page__text">Цвет</span>
                <input type="text" class="page__input" placeholder="" />
              </label>
              <label class="page__label">
                <span class="page__text">М<sup>2</sup></span>
                <input type="text" class="page__input" placeholder="" />
              </label>
              <button class="page__btn btn" type="button">
                <span class="icon icon-layers"></span>
              </button>
            </div>

            <div class="page__item page__item-black">
              <label class="page__label page__label-large">
                <span class="page__text">Комплект фасадов 2</span>
                <span class="page__label_w">
                  <input type="text" class="page__input" placeholder="" />
                  <span class="icon icon-search"></span>
                </span>
              </label>
              <label class="page__label page__label-color">
                <span class="page__text">Цвет</span>
                <input type="text" class="page__input" placeholder="" />
              </label>
              <label class="page__label">
                <span class="page__text">М<sup>2</sup></span>
                <input type="text" class="page__input" placeholder="" />
              </label>
              <button class="page__btn page__btn-black btn" type="button">
                <span class="icon icon-layers"></span>
              </button>
              <button class="page__btn page__btn-grey btn" type="button">
                <span class="icon icon-plus"></span>
              </button>
            </div>

            <div class="page__item page__item-red">
              <label class="page__label page__label-type">
                <span class="page__text">Тип</span>
                <span class="page__label_select">
                  <select class="page__select js-select">
                    <option value="Без типа">Без типа</option>
                    <option value="Без типа">Без типа</option>
                    <option value="Без типа">Без типа</option>
                    <option value="Без типа">Без типа</option>
                  </select>
                </span>
              </label>
              <label class="page__label page__label-article">
                <span class="page__text">Артикул</span>
                <input type="text" class="page__input" placeholder="" />
              </label>
              <label class="page__label">
                <span class="page__text">Ширина</span>
                <input type="text" class="page__input" placeholder="" />
              </label>
              <label class="page__label">
                <span class="page__text">Высота</span>
                <input type="text" class="page__input" placeholder="" />
              </label>
              <label class="page__label page__label-res">
                <span class="page__text">М<sup>2</sup></span>
                <input type="text" class="page__input" readonly />
              </label>
            </div>

            <div class="page__item">
              <label class="page__label page__label-fill">
                <span class="page__text">Фурнитура Петли</span>
                <span class="page__label_w">
                  <input type="text" class="page__input" placeholder="" />
                  <span class="icon icon-search"></span>
                </span>
              </label>
              <label class="page__label page__label-count">
                <span class="page__text">Кол-во</span>
                <input type="text" class="page__input" placeholder="" />
              </label>
              <button class="page__btn page__btn-light btn" type="button">
                <span class="icon icon-plus"></span>
              </button>
            </div>
            <div class="page__item">
              <label class="page__label page__label-fill">
                <span class="page__text">Столешница</span>
                <span class="page__label_w">
                  <input type="text" class="page__input" placeholder="" />
                  <span class="icon icon-search"></span>
                </span>
              </label>
              <label class="page__label page__label-color">
                <span class="page__text">Цвет</span>
                <input type="text" class="page__input" placeholder="" />
              </label>
              <label class="page__label page__label-count">
                <span class="page__text">Кол-во</span>
                <input type="text" class="page__input" placeholder="" />
              </label>
              <button class="page__btn page__btn-light btn" type="button">
                <span class="icon icon-plus"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="page__right">
        <pre style="line-height: 1; font-size: 0;">
          <small>
            <code style="font-size: 1.4rem">
              {{ list }}
            </code>
          </small>
        </pre>

        <div class="calc">
          <div class="calc__item">
            <div class="calc__head">
              <div class="calc__head_title">ПРОСЧЕТ <span>А</span></div>
              <div class="calc__nav">
                <div class="calc__nav_menu">
                  <a href="#" class="calc__nav_link">Редактировать</a>
                  <a href="#" class="calc__nav_link">Дублировать</a>
                  <a href="#" class="calc__nav_link">Удалить</a>
                  <a href="#" class="calc__nav_link">%</a>
                </div>
                <button class="calc__nav_toggle" type="button">
                  <span class="icon icon-more"></span>
                </button>
              </div>
              <button class="calc__show" type="button" і>
                <span class="icon icon-down"></span>
              </button>
            </div>

            <div class="calc__content">
              <ul class="calc__list">
                {% for i in range(0, 7) -%}
                <li class="calc__row">
                  <div class="calc__name">
                    <b>Мтериал корпуса:</b> Базовый, Серый
                  </div>
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

              <button class="calc__toggle" type="button">
                <span class="icon icon-down"></span>
              </button>
            </div>
          </div>

          <div class="calc__item">
            <div class="calc__head">
              <div class="calc__head_title">ПРОСЧЕТ <span>Б</span></div>
              <div class="calc__nav">
                <div class="calc__nav_menu">
                  <a href="#" class="calc__nav_link">Редактировать</a>
                  <a href="#" class="calc__nav_link">Дублировать</a>
                  <a href="#" class="calc__nav_link">Удалить</a>
                  <a href="#" class="calc__nav_link">%</a>
                </div>
                <button class="calc__nav_toggle" type="button">
                  <span class="icon icon-more"></span>
                </button>
              </div>
              <button class="calc__show" type="button">
                <span class="icon icon-down"></span>
              </button>
            </div>
            <div class="calc__content">
              <ul class="calc__list">
                {% for i in range(0, 5) -%}
                <li class="calc__row">
                  <div class="calc__name">
                    <b>Мтериал корпуса:</b> Базовый, Серый
                  </div>
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

              <button class="calc__toggle" type="button">
                <span class="icon icon-down"></span>
              </button>
            </div>
          </div>
        </div>

        <button class="calc__add btn" type="button">
          <span class="icon icon-plus"></span>
        </button>
        <div class="calc__bottom">
          <button class="calc__order btn" type="button">
            ОФОРМИТЬ ДОГОВОР
          </button>
          <button class="btn" type="button">СФОРМИРОВАТЬ КП</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageItem from "@/components/Page-item";

export default {
  name: "Page",
  components: { PageItem },
  computed: {
    list() {
      console.log();
      return this.$store.getters.list;
    }
  },
  // watch: {
  //   list(fbError) {
  //     this.$error("Что-то пошло не так");
  //   }
  // },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>
