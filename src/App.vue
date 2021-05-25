<template>
  <Nav v-if="!['Login', 'Signup', 'Help'].includes($route.name)"/>
  <router-view/>
  <Footer v-if="!['Login', 'Signup', 'Help'].includes($route.name)"/>
</template>

<style scoped>
  @import "https://mdbootstrap.com/previews/ecommerce-demo/css/mdb-pro.min.css";
  @import "assets/css/mdb.ecommerce.min.css";
  @import "assets/css/style.css";

</style>
<script>
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default {
  components: {Footer, Nav}
}
</script>
