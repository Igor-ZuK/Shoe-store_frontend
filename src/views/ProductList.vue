<template>
  <div class="product-list">

    <div class="search__field">
      <form action="/search" method="get"
            class="form-inline d-flex justify-content-center md-form form-sm active-brown active-brown-2 mt-2">
        <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" name="query"
               aria-label="Search">
        <button class="btn peach-gradient btn-rounded btn-sm my-0" type="submit">Search</button>
      </form>
    </div>

    <div class="filter__fields">
      <div class="input-group mb-3 filter_field price_min">
        <div class="input-group-prepend">
          <span class="input-group-text">От</span>
        </div>
        <input type="number" class="form-control" v-model="price_min">
        <div class="input-group-append">
          <span class="input-group-text">$</span>
        </div>
      </div>
      <div class="input-group mb-3 filter_field price_max">
        <div class="input-group-prepend">
          <span class="input-group-text">До</span>
        </div>
        <input type="number" class="form-control" v-model="price_max">
        <div class="input-group-append">
          <span class="input-group-text">$</span>
        </div>
      </div>
      <div class="input-group mb-3 filter_field boot_size">
        <div class="input-group-prepend">
          <span class="input-group-text">Размер</span>
        </div>
        <input type="number" class="form-control" v-model="size">
      </div>
    </div>

    <div class="container">


      <!--        <div class="size_fields">-->
      <!--          <div class="input-group mb-3">-->
      <!--            <div class="input-group-prepend">-->
      <!--              <span class="input-group-text">42</span>-->
      <!--            </div>-->
      <!--            <div class="input-group-append">-->
      <!--              <div class="input-group-text">-->
      <!--                <input type="checkbox" class="size__checkbox" aria-label="Checkbox for following text input">-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->

      <!--        </div>-->

      <div class="row mb-md-2">
        <div class="col-md-6 col-lg-4"
             v-for="product in products"
             :key="product.id">
          <ProductBox :product="product"/>
        </div>
      </div>
    </div>
    <div class="row py-3 pagination-bar">
      <div class="col text-center">
        <Pagination :total="total"
                    :item="products.length"
                    @page-changed="getProducts"
        />
      </div>
    </div>
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
      links: Object,
      total: 0,
      price_min: 0,
      price_max: 0,
      size: 0,
      apiRoute: '',
      filterParams: ''
    }
  },
  created() {
    this.getRoute()

    this.getProducts(this.page)
  },
  methods: {
    getRoute() {
      if (this.$route.href.indexOf('/article/') === 0) {
        const articleUrl = this.$route.params.article_slug

        this.apiRoute = `/api/v1/shoes/article/${articleUrl}/`

        document.title = 'Article | The Loop'
      } else {
        this.apiRoute = `/api/v1/shoes/`

        document.title = 'Products | The Loop'
      }
    },
    async getProducts(pageNumber, filterParams='') {
      this.$store.commit('setIsLoading', true)

      await axios
        .get(`${this.apiRoute}?page=${pageNumber}${filterParams}`)
        .then(response => {
          this.products = response.data.data
          this.total = response.data.count
          this.links = response.data.link

        })
        .catch(error => {
          console.log(error)
        })

      this.$store.commit('setIsLoading', false)
    },
  },
  watch: {
    price_min() {
      if (this.price_min !== '' && this.price_min >= 0) {

        this.filterParams += `&price_min=${this.price_min}`
      }
    },
    price_max() {
      if (this.price_max !== '' && this.price_max >= 0 && this.price_max <= 9999) {

        this.filterParams += `&price_max=${this.price_max}`
      }
    },
    size() {
      if (this.size !== '' && this.size >= 25 && this.size <= 50) {

        this.filterParams += `&size=${this.size}`
      }
    },
    filterParams() {
      this.getProducts(this.page, this.filterParams)
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

.filter__fields {
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.filter_field {
  width: 30%;
  flex-grow: 0;
  flex-shrink: 0;
}

</style>
