<template>
  <div class="home">
    <div class="page page-light">
      <div class="wrapper">

        <div class="main">
          <div class="main-item sale">
            <p class="sale-description">Зимняя распродажа</p>
            <h1 class="sale-title">СКИДКИ ДО 90%</h1>
            <a class="btn" href="/shoes">Смотреть модели</a>
          </div>
          <div class="main-item box-item">
            <div class="box-price">
              <strike class="box-price-old">250 $</strike>
              <p class="box-price-new">30 $</p>
            </div>
            <img class="box-image" src="../assets/img/shoes.png" alt="Shoes">
          </div>
        </div>
      </div>
    </div>
    <div class="page page-dark notice">
      <div class="wrapper">
        <h1 class="notice-title"><span>Бесплатная доставка</span> от 99 $</h1>
        <p class="notice-description">Сделайте заказ и получите подарок!</p>
      </div>
    </div>
    <div class="page-light">
      <div class="wrapper">
        <div class="collection">
          <div class="collection-item collection-man">
            <h2 class="collection-title">Мужская коллекция</h2>
            <p class="collection-description">Обувь, полуверы, костюмы</p>
            <a href="" class="btn btn-xs"><img src="../assets/img/arrow.svg" alt="Arrow"></a>
          </div>
          <div class="collection-item collection-woman">
            <h2 class="collection-title">Женская коллекция</h2>
            <p class="collection-description">Обувь, полуверы, костюмы</p>
            <a href="" class="btn btn-xs"><img src="../assets/img/arrow.svg" alt="Arrow"></a>
          </div>
        </div>
      </div>
    </div>
    <div class="page">
      <div class="wrapper">
        <h2 class="title-h2">Новые модели</h2>
        <div class="product">
          <div class="product-item"
              v-for="product in latestProducts"
              :key="product.id"
              @click="goTo(product.get_absolute_url)"
          >
            <img :src="product.get_thumbnail" alt="Product">
            <p class="product-title">{{ product.fabricator }}<br>{{ product.title }}</p>
            <p class="product-price">$ {{ product.price }}</p>
          </div>
        </div>
        <a class="btn btn-center" href="/shoes/">
          <span>Все модели</span>
          <img src="../assets/img/arrow.svg" alt="Arrow">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ProductBox from "@/components/ProductBox";

export default {
  name: 'Home',
  data() {
    return {
      latestProducts: []
    }
  },
  components: {
    ProductBox
  },
  mounted() {
    this.getLatestProducts()

    document.title = 'Home | The Loop'
  },
  methods: {
    goTo(product_url) {
      window.location.href = product_url
    },
    getLatestProducts() {
      axios
      .get('/api/v1/')
      .then(response => {
        this.latestProducts = response.data
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  .product-item {
    cursor: pointer;
  }
</style>
