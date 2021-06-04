<template>
  <Nav v-if="!['Login', 'SignUp', 'Help'].includes($route.name)" />
  <div class="text-center">
    <div role="status" :class="{'spinner-border': $store.state.isLoading}">
    </div>
  </div>
  <router-view />
  <Footer v-if="!['Login', 'SignUp', 'Help'].includes($route.name)" />
</template>

<style scoped>
@import "https://mdbootstrap.com/previews/ecommerce-demo/css/mdb-pro.min.css";
@import "./assets/css/mdb.ecommerce.min.css";
@import "./assets/css/bootstrap.min.css";
@import "./assets/css/style.css";

</style>


<script>
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import axios from "axios";

export default {
  components: {Footer, Nav},
  beforeCreate() {
    this.$store.commit('initializeStore')

    const token = this.$store.state.token

    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
}
</script>
