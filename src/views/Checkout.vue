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
            <td>${{ item.product.price }}</td>
            <td>{{ item.quantity }}</td>
            <td>${{ getItemTotal(item).toFixed(2) }}</td>
          </tr>
          </tbody>

          <tfoot>
          <tr>
            <td colspan="2">Итог</td>
            <td>{{ cartTotalLength }}</td>
            <td>${{ cartTotalPrice.toFixed(2) }}</td>
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
      stripe: '',
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

    if (this.cartTotalLength > 0) {
      this.stripe = Stripe(
        'pk_test_51IwSaTFh9IbUGqWSbYJnX8yHFV8wQjyzKISFxvqZUhZWYfsZoLWZnHcGjCaZut59Z1PdQmtEDxJUyOYbiGTQTfAE007dE9ymDr'
      )
      const elements = this.stripe.elements()
      this.card = elements.create('card', { hidePostalCode: true })

      this.card.mount('#card-element')
    }
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

      if (!this.errors.length) {
        this.$store.commit('setIsLoading', true)

        this.stripe.createToken(this.card).then(result => {
          if (result.error) {
            this.$store.commit('setIsLoading', false)

            this.errors.push('Упс...Что-то пошло не так с оплатой. Попробуйте ещё раз.')

            console.log(result.error.message())
          } else {
            this.stripeTokenHandler(result.token)
          }
        })
      }
    },
    async stripeTokenHandler(token) {
      const items = []

      for (let i = 0; i < this.cart.items.length; ++i) {
        const item = this.cart.items[i]
        const obj = {
          product: item.product.id,
          quantity: item.quantity,
          price: item.product.price * item.quantity
        }

        items.push(obj)
      }

      const data = {
        'first_name': this.first_name,
        'last_name': this.last_name,
        'email': this.email,
        'address': this.address,
        'place': this.place,
        'phone': this.phone,
        'items': items,
        'stripe_token': token.id
      }


      await axios
          .post('/api/v1/checkout', data)
          .then(response => {
            this.$store.commit('clearCart')
            this.$router.push('/cart/success')
          })
          .catch(error => {
            this.errors.push('Что-то пошло не по плану. Попробуйте пожалуйста ещё раз')

            console.log(error)
          })

          this.$store.commit('setIsLoading', false)
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
