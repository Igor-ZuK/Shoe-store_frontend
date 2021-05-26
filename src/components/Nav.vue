<template>
  <div class="page-light">
    <div class="wrapper">
        <header class="header">
            <nav>
                <ul class="nav">
                    <li class="nav-item"><a class="nav-link" href="">Для мужчин</a></li>
                    <li class="nav-item"><a class="nav-link" href="">Для женщин</a></li>
                    <li class="nav-item"><a class="nav-link" href="">Для детей</a></li>
                </ul>
            </nav>
            <a href="/">
              <img class="header-logo" src="../assets/img/logo.svg" alt="Logo">
            </a>
            <ul class="nav nav-info">
                <li class="nav-item"><a class="nav-link" href="">Оплата</a></li>
                <li class="nav-item"><a class="nav-link" href="">Доставка</a></li>
            </ul>
            <button class="cart" @click="goToCart">
                <span class="cart-count">{{ cartTotalLength }}</span>
            </button>
            <div class="toggle-menu" @click="changeMenu">
                <div class="line line1"></div>
                <div class="line line2"></div>
                <div class="line line3"></div>
            </div>
        </header>
    </div>
  </div>
  <div class="nav-bar">
    <ul class="nav-list">
        <li class="nav-list-item"><a href="" class="nav-link">Для мужчин</a></li>
        <li class="nav-list-item"><a href="" class="nav-link">Для женщин</a></li>
        <li class="nav-list-item"><a href="" class="nav-link">Для детей</a></li>
        <li class="nav-list-item"><a href="" class="nav-link">Оплата</a></li>
        <li class="nav-list-item"><a href="" class="nav-link">Доставка</a></li>
    </ul>
</div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      cart: {
        items: []
      }
    }
  },
  beforeCreate() {
    this.$store.commit('initializeStore')
  },
  mounted() {
    this.cart = this.$store.state.cart
  },
  computed: {
    cartTotalLength() {
      let totalLength = 0

      for(let i = 0; i < this.cart.items.length; ++i) {
        totalLength += this.cart.items[i].quantity
      }

      return totalLength
    }
  },
  methods:  {
    goToCart () {
      window.location.href = 'cart'
    },
    changeMenu () {
      const navBar = document.querySelector('.nav-bar');
      navBar.classList.toggle('toggle');
    }
  }
}
</script>

<style scoped>

.cart-link {
  text-decoration: none;
}

.toggle-menu {
    box-sizing: initial;
}

.cart {
  cursor: pointer;
}

</style>
