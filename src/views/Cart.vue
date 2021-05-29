<template>
  <div class="page-cart">
    <div class="columns is-multiline">
      <div class="column is-12 cart__title">
        <h1 class="title">Корзина</h1>
      </div>

      <div class="column is-12 box">
        <table class="table is-fullwidth" v-if="cartTotalLength">
          <thead>
          <tr>
            <th>Продукт</th>
            <th>Цена</th>
            <th>Кол-во</th>
            <th>Итог</th>
            <th></th>
          </tr>
          </thead>

          <tbody>
          <CartItem
            v-for="item in cart.items"
            v-bind:key="item.product.id"
            v-bind:initialItem="item"
            v-on:removeFromCart="removeFromCart"/>
          </tbody>
        </table>

        <p v-else class="cart_empty">Ваша корзина пуста...</p>
      </div>

      <div class="column is-12 box summary">
        <h2 class="subtitle">Общая цена</h2>

        <strong>BYN {{ cartTotalPrice.toFixed(2) }}</strong>, {{ cartTotalLength }} items

        <hr>

        <router-link to="/cart/checkout" class="button is-dark">Перейти к оформлению</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CartItem from '@/components/CartItem.vue'

export default {
  name: 'Cart',
  components: {
    CartItem
  },
  data() {
    return {
      cart: {
        items: []
      }
    }
  },
  mounted() {
    this.cart = this.$store.state.cart

    console.log(this.cart)
  },
  methods: {
    removeFromCart(item) {
      this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id)
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

<style lang="scss">
.page-cart {
  padding: 2em;
  font-size: 16px;
}

.title {
  text-align: center;
}

.summary {
  margin-top: 10em;

}

.cart__title {
  margin: 2em 0 5em;
}

.cart_empty {
  font-size: 26px;
}
</style>
