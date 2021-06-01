<template>
  <div class="product">
    <div class="product-item" @click="goTo(product.get_absolute_url)">
      <img :src="product.get_thumbnail" alt="Product">
      <p class="product-title">{{ product.fabricator }}<br>{{ product.title }}</p>
      <p class="product-price">$ {{ product.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductBox",
  props: {
    product: Object
  },
  methods: {
    goTo(product_url) {
        window.location.href = product_url
      },
  }
}
</script>

<style scoped>
  .product-item {
    cursor: pointer;
  }
</style>
