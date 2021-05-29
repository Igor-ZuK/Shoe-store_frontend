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
            <button class="cart" @click="goTo('/cart')">
                <span class="cart-count">{{ cartTotalLength }}</span>
            </button>

            <div class="nav btn login-button"
                 @click="goTo('/log-in')"
                 v-if="!$store.state.isAuthenticated"
            >
              <p class="login__title">Войти</p>
            </div>
            <div class="nav btn account-button"
                 @click="goTo('/my-account')"
                 v-else>
              <p class="account__title">Мой Аккаунт</p>
            </div>

            <div class="toggle-menu" @click="changeMenu">
                <div class="line line1"></div>
                <div class="line line2"></div>
                <div class="line line3"></div>
            </div>
        </header>
    </div>
  </div>
  <div class="nav-bar">
    <p class="account-mobile"
       @click="goTo('/log-in')"
       v-if="!$store.state.isAuthenticated">Войти</p>
    <p class="login-mobile"
       @click="goTo('/my-account')"
       v-else>My <br>Account</p>
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
import axios from "axios";

export default {
  name: "Nav",
  data() {
    return {
      cart: {
        items: []
      }
    }
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
    goTo (url) {
      window.location.href = url
    },
    changeMenu () {
      const navBar = document.querySelector('.nav-bar');
      navBar.classList.toggle('toggle');
    }
  }
}
</script>

<style scoped>

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  color: inherit;
  text-decoration: none;
}

.login-button, .account-button {
  margin-left: 2em;
  padding: 2px;
  background: #D7B399;
  color: white;
  font-weight: 500;
  font-size: 16px;
  justify-content: center;
  cursor: pointer;
  border-radius: 30%;
}

.login-button {
  padding: 5px;
}

.login__title {
  padding: 5px;
  margin-top: 2px;
}

.account__title {
  padding: 2px;
  margin-top: 2px;
}

.toggle-menu {
    box-sizing: initial;
}

.login-mobile, .account-mobile {
  position: absolute;
  top: 10%;
  cursor: pointer;
  background: #F9F6F1;
  padding: 20px;
  border-radius: 30%;
  text-align: center;
  font-weight: 500;
}

.account-mobile {
  border-radius: 45%;
}

.login-mobile:hover, .account-mobile:hover {
  color: #D7B399;
  font-weight: 700;
  width: 110px;
}

.account-mobile:hover {
  width: 130px;
}

.nav-link:hover {
  font-weight: 700;
}

.cart {
  cursor: pointer;
}

</style>
