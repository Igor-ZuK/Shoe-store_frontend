<template>
  <div class="product-list">
    <main>
      <div class="container">
        <div class="row mb-md-2">
          <div class="col-md-6 col-lg-4">
            <div class="product">
              <div class="product-item">
                <img src="../assets/img/product02.png" alt="Product">
                <p class="product-title">Футболка <br>черная</p>
                <p class="product-price">₽ 10 000</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="product">
              <div class="product-item">
                <img src="../assets/img/product02.png" alt="Product">
                <p class="product-title">Футболка <br>черная</p>
                <p class="product-price">₽ 10 000</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="product">
              <div class="product-item">
                <img src="../assets/img/product02.png" alt="Product">
                <p class="product-title">Футболка <br>черная</p>
                <p class="product-price">₽ 10 000</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="product">
              <div class="product-item">
                <img src="../assets/img/product02.png" alt="Product">
                <p class="product-title">Футболка <br>черная</p>
                <p class="product-price">₽ 10 000</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="product">
              <div class="product-item">
                <img src="../assets/img/product02.png" alt="Product">
                <p class="product-title">Футболка <br>черная</p>
                <p class="product-price">₽ 10 000</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="product">
              <div class="product-item">
                <img src="../assets/img/product02.png" alt="Product">
                <p class="product-title">Футболка <br>черная</p>
                <p class="product-price">₽ 10 000</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row py-3">
          <div class="col text-center">
            <Pagination :total="1" :item="9" />
          </div>
        </div>
      </div>
    </main>

  </div>
</template>

<script>
  import Pagination from "@/components/Pagination";
  export default {
    name: "ProductList",
    components: {Pagination}
  }
</script>

<style scoped>
  @import "../assets/css/bootstrap.min.css";
</style>
