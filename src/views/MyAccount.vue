<template>
  <div class="page-my-account">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Мой аккаунт</h1>
      </div>

      <hr>

      <div class="column is-12 order-summary">
        <h2 class="subtitle">Мои заказы</h2>

        <OrderSummary
          v-for="order in orders"
          :key="order.id"
          :order="order" />
      </div>

      <div class="column is-12 logout-btn">
        <button @click="logout" class="btn btn-danger">Выйти</button>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import OrderSummary from "@/components/OrderSummary";

export default {
  name: "MyAccount",
  components: {
    OrderSummary
  },
  data() {
    return {
      orders: []
    }
  },
  mounted() {
    document.title = 'My account | The Loop'

    this.getMyOrders()
  },
  methods: {
    logout() {
      axios.defaults.headers.common["Authorization"] = ""

      localStorage.removeItem("token")
      localStorage.removeItem("username")
      localStorage.removeItem("userid")

      this.$store.commit('removeToken')

      this.$router.push('/')
    },
    async getMyOrders() {
      this.$store.commit('setIsLoading', true)

      await axios
        .get('/api/v1/orders/')
        .then(response => {
          this.orders = response.data
        })
        .catch(error => {
          console.log(error)
        })

      this.$store.commit('setIsLoading', false)
    }
  }
}
</script>

<style scoped>
  .page-my-account {
    height: 100%;
    width: 100%;
    margin-top: 5%;
  }

  .order-summary {
    margin: 5% auto;
  }

  .subtitle {
    margin-left: 20px;
  }


</style>
