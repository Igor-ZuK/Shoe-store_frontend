<template>
  <div class="product-list">
    <main>
      <div class="container">
        <h1 class="title">Search</h1>
        <h2 class="is-size-5 has-text-grey mt-5">Search term: "{{ query }}"</h2>
        <div class="row mb-md-2">
          <div class="col-md-6 col-lg-4"
              v-for="product in products"
              :key="product.id">
            <ProductBox :product="product" />
          </div>
        </div>
      </div>
    </main>

  </div>
</template>

<script>
import axios from "axios"
import ProductBox from "@/components/ProductBox";

export default {
  name: "Search",
  components: {ProductBox},
  data() {
    return {
      products: [],
      query: ''
    }
  },
  mounted() {
    document.title = 'Search | The Loop'

    let url = window.location.search.substring(1)
    let params = new URLSearchParams(url)

    if (params.get('query')) {
      this.query = params.get('query')

      this.performSearch()
    }
  },
  methods: {
    async performSearch() {
      this.$store.commit('setIsLoading', true)

      await axios
        .post('/api/v1/shoes/search/', {'query': this.query})
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
  .container {
    padding: 5em;
  }
</style>
