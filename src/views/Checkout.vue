<template>
  <div class="page-checkout">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Checkout</h1>
      </div>

      <div class="column is-12 box">
        <table class="table is-fullwidth">
          <thead>
          <tr>
            <th>Продукт</th>
            <th>Цена</th>
            <th>Кол-во</th>
            <th>Итог</th>
          </tr>
          </thead>

          <tbody>
          <tr
            v-for="item in cart.items"
            :key="item.product.id"
          >
            <td>{{ item.product.title }}</td>
            <td>{{ item.product.price }}</td>
            <td>{{ item.quantity }}</td>
            <td>BYN{{ getItemTotal(item).toFixed(2) }}</td>
          </tr>
          </tbody>

          <tfoot>
          <tr>
            <td colspan="2">Итог</td>
            <td>{{ cartTotalLength }}</td>
            <td>BYN{{ cartTotalPrice.toFixed(2) }}</td>
          </tr>
          </tfoot>
        </table>
      </div>

      <div class="column is-12 box details">
        <h2 class="subtitle">Shipping details</h2>

        <p class="has-text-grey mb-4"><span class="asterisk">*</span> Обязательные для заполнения</p>

        <div class="columns is-multiline">
          <div class="column is-6">
            <div class="field">
              <label>Имя<span class="asterisk">*</span></label>
              <div class="control">
                <input type="text" class="input" v-model="first_name">
              </div>
            </div>

            <div class="field">
              <label>Фамилия<span class="asterisk">*</span></label>
              <div class="control">
                <input type="text" class="input" v-model="last_name">
              </div>
            </div>

            <div class="field">
              <label>E-mail<span class="asterisk">*</span></label>
              <div class="control">
                <input type="email" class="input" v-model="email">
              </div>
            </div>

            <div class="field">
              <label>Телефон<span class="asterisk">*</span></label>
              <div class="control">
                <input type="text" class="input" v-model="phone">
              </div>
            </div>
          </div>

          <div class="column is-6">
            <div class="field">
              <label>Адрес<span class="asterisk">*</span></label>
              <div class="control">
                <input type="text" class="input" v-model="address">
              </div>
            </div>

            <div class="field">
              <label>Город<span class="asterisk">*</span></label>
              <div class="control">
                <input type="text" class="input" v-model="place">
              </div>
            </div>
          </div>
        </div>
        <div class="notification is-danger error-block" v-if="errors.length">
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>

        <hr>

        <div id="card-element" class="mb-5"></div>

        <div v-if="cartTotalLength">
          <hr>

          <button class="btn" @click="submitForm">Оплатить</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "Checkout",
  data() {
    return {
      cart: {
        items: []
      },
      card: {},
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address: '',
      place: '',
      errors: []
    }
  },
  mounted() {
    document.title = 'Checkout | The Loop'

    this.cart = this.$store.state.cart
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price
    },
    submitForm() {
      this.errors = []

      if (this.first_name === '') {
        this.errors.push('Поле Имя пропущено')
      }

      if (this.last_name === '') {
        this.errors.push('Поле Фамилия пропущено')
      }

      if (this.email === '') {
        this.errors.push('Поле E-mail пропущено')
      }

      if (this.phone === '') {
        this.errors.push('Поле Телефон пропущено')
      }

      if (this.address === '') {
        this.errors.push('Поле Адрес пропущено')
      }

      if (this.place === '') {
        this.errors.push('Поле Город пропущено')
      }
    }
  },
  computed: {
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return acc += curVal.quantity
      }, 0)
    },
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return acc += curVal.product.price * curVal.quantity
      }, 0)
    },
  }
}
</script>

<style scoped>
@import "~bulma/css/bulma.css";

.page-checkout {
  margin: 5% 0 8%;
}

.box {
  padding-left: 2em;
  padding-right: 2em;
}

.details {
  padding-bottom: 5%;
}

.asterisk {
  color: red;
}

.error-block {
  display: inline-block;
  color: #4a4a4a;
  font-weight: 500;
  font-size: 17px;
}

</style>
