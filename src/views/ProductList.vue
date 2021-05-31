<template>
  <div class="product-list">
    <main>
      <div class="container">
        <div class="search__field">
          <form action="/search" method="get" class="form-inline d-flex justify-content-center md-form form-sm active-brown active-brown-2 mt-2">
            <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" name="query"
              aria-label="Search">
            <button class="btn peach-gradient btn-rounded btn-sm my-0" type="submit">Search</button>
          </form>
        </div>
        <div class="row mb-md-2">
          <div class="col-md-6 col-lg-4"
              v-for="product in products"
              :key="product.id">
            <ProductBox :product="product" />
          </div>
        </div>
        <div class="row py-3">
          <div class="col text-center">
            <Pagination :total="1" :item="products.length" />
          </div>
        </div>
      </div>
    </main>

  </div>
</template>

<script>
  import axios from "axios";
  import ProductBox from "@/components/ProductBox";
  import Pagination from "@/components/Pagination";


  export default {
    name: "ProductList",
    components: {
      Pagination,
      ProductBox
    },
    data() {
      return {
        products: [],
        page: 1,
        total: 0
      }
    },
    mounted() {
      if (this.$route.href.indexOf('/article/') === 0) {
        this.getProductArticle()

        document.title = 'Article | The Loop'
      } else {
        this.getProducts()

        document.title = 'Products | The Loop'
      }
    },
    methods: {
      async getProducts() {
        this.$store.commit('setIsLoading', true)

        await axios
          .get('/api/v1/shoes')
          .then(response => {
            this.products = response.data
          })
          .catch(error => {
            console.log(error)
          })

        this.$store.commit('setIsLoading', false)
      },
      async getProductArticle() {
        this.$store.commit('setIsLoading', true)

        const articleUrl = this.$route.params.article_slug

        await axios
          .get(`/api/v1/shoes/article/${articleUrl}`)
          .then(response => {
            this.products = response.data
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
  @import "../assets/css/bootstrap.min.css";

  .container {
    padding: 5em;
  }

  .search__field {
    margin: 2em 0 5em;
  }

  .active-brown-2 input.form-control[type=text]:focus:not([readonly]) {
    border-bottom: 1px solid #ce93d8;
    box-shadow: 0 1px 0 0 #ce93d8;
  }

  .active-brown input.form-control[type=text] {
    border-bottom: 1px solid #D7B399;
    box-shadow: 0 1px 0 0 #D7B399;
  }

  .btn-rounded {
    border-radius: 20px;
  }
</style>
