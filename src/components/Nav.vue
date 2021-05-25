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
            <a href="#">
              <img class="header-logo" src="../assets/img/logo.svg" alt="Logo">
            </a>
            <ul class="nav nav-info">
                <li class="nav-item"><a class="nav-link" href="">Оплата</a></li>
                <li class="nav-item"><a class="nav-link" href="">Доставка</a></li>
            </ul>
            <a href="" class="cart-link">
                <button class="cart">
                    <span class="cart-count">5</span>
                </button>
            </a>
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
  methods:  {
    changeMenu: function () {
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

</style>
