<template>
  <div>
    <main>
      <div class="container">
        <section class="mb-5">
          <div class="row">
            <div class="col-md-6 mb-4 mb-md-0">
              <div id="mdb-lightbox-ui"></div>
              <div class="mdb-lightbox">
                <div class="row product-gallery mx-1">
                  <div class="col-12 mb-0">
                    <figure class="view overlay rounded z-depth-1 main-img" style="max-height: 450px;">
                      <a :href="product.get_image"
                         data-size="710x823"
                         target="_blank"
                      >
                        <img :src="product.get_image"
                             class="img-fluid z-depth-1" alt="Img verticla">
                      </a>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <h5>{{ product.title }}</h5>
              <p class="mb-2 text-muted text-uppercase small">{{ product.fabricator }}</p>
              <ul class="rating">
                <li>
                  <i class="fas fa-star fa-sm text-primary"></i>
                </li>
                <li>
                  <i class="fas fa-star fa-sm text-primary"></i>
                </li>
                <li>
                  <i class="fas fa-star fa-sm text-primary"></i>
                </li>
                <li>
                  <i class="fas fa-star fa-sm text-primary"></i>
                </li>
                <li>
                  <i class="far fa-star fa-sm text-primary"></i>
                </li>
              </ul>
              <p><span class="mr-1"><strong>{{ product.price }}</strong></span></p>
              <p class="pt-1">{{ product.description }}</p>
              <div class="table-responsive">
                <table class="table table-sm table-borderless mb-0">
                  <tbody>
                  <tr>
                    <th class="pl-0 w-25" scope="row"><strong>Артикль</strong></th>
                    <td>{{ product.article }}</td>
                  </tr>
                  <tr>
                    <th class="pl-0 w-25" scope="row"><strong>Размер</strong></th>
                    <td>{{ product.size }}</td>
                  </tr>
                  <tr>
                    <th class="pl-0 w-25" scope="row"><strong>В наличии</strong></th>
                    <td>{{ product.pair_quantity }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <hr>
              <div class="table-responsive mb-2">
                <table class="table table-sm table-borderless">
                  <tbody>
                  <tr>
                    <td class="pl-0 pb-0 w-25">Quantity</td>
                  </tr>
                  <tr>
                    <td class="pl-0">
                      <div class="def-number-input number-input mb-0">
                        <button @click="quantity > 1 ? quantity -= 1: quantity"
                                class="minus"></button>
                        <input class="quantity" min="1" v-model="quantity" type="number">
                        <button @click="quantity < product.pair_quantity ? quantity += 1: quantity"
                                class="plus"></button>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <button type="button"
                      class="btn btn-yellow-200 btn-md mr-1 mb-2"
                      @click="addToCart"
              ><i
                class="fas fa-shopping-cart pr-2"></i>Add to
                cart
              </button>
            </div>
          </div>
        </section>
        <div class="classic-tabs">
          <ul class="nav tabs-warning nav-justified" id="advancedTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active show" id="description-tab" data-toggle="tab" href="#description"
                 role="tab"
                 aria-controls="description" aria-selected="true">Description</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="info-tab" data-toggle="tab" href="#info" role="tab" aria-controls="info"
                 aria-selected="false">Information</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="reviews-tab" data-toggle="tab" href="#reviews" role="tab"
                 aria-controls="reviews"
                 aria-selected="false">Reviews (1)</a>
            </li>
          </ul>
          <div class="tab-content" id="advancedTabContent">
            <div class="tab-pane fade show active" id="description" role="tabpanel"
                 aria-labelledby="description-tab">
              <h5>Product Description</h5>
              <p class="small text-muted text-uppercase mb-2">{{ product.fabricator }} {{ product.title }}</p>
              <ul class="rating">
                <li>
                  <i class="fas fa-star fa-sm text-primary"></i>
                </li>
                <li>
                  <i class="fas fa-star fa-sm text-primary"></i>
                </li>
                <li>
                  <i class="fas fa-star fa-sm text-primary"></i>
                </li>
                <li>
                  <i class="fas fa-star fa-sm text-primary"></i>
                </li>
                <li>
                  <i class="far fa-star fa-sm text-primary"></i>
                </li>
              </ul>
              <h6>{{ product.price }}</h6>
              <p class="pt-1">{{ product.description }}</p>
            </div>
            <div class="tab-pane fade" id="info" role="tabpanel" aria-labelledby="info-tab">
              <h5>Additional Information</h5>
              <table class="table table-striped table-bordered mt-3">
                <thead>
                <tr>
                  <th scope="row" class="w-150 dark-grey-text h6">Weight</th>
                  <td><em>0.3 kg</em></td>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row" class="w-150 dark-grey-text h6">Dimensions</th>
                  <td><em>50 × 60 cm</em></td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
              <h5><span>1</span> review for <span>Fantasy T-shirt</span></h5>
              <div class="media mt-3 mb-4">
                <img class="d-flex mr-3 z-depth-1"
                     src="https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg"
                     width="62" alt="Generic placeholder image">
                <div class="media-body">
                  <div class="d-flex justify-content-between">
                    <p class="mt-1 mb-2">
                      <strong>Marthasteward </strong>
                      <span>– </span><span>January 28, 2020</span>
                    </p>
                    <ul class="rating mb-0">
                      <li>
                        <i class="fas fa-star fa-sm text-primary"></i>
                      </li>
                      <li>
                        <i class="fas fa-star fa-sm text-primary"></i>
                      </li>
                      <li>
                        <i class="fas fa-star fa-sm text-primary"></i>
                      </li>
                      <li>
                        <i class="fas fa-star fa-sm text-primary"></i>
                      </li>
                      <li>
                        <i class="far fa-star fa-sm text-primary"></i>
                      </li>
                    </ul>
                  </div>
                  <p class="mb-0">Nice one, love it!</p>
                </div>
              </div>
              <hr>
              <h5 class="mt-4">Add a review</h5>
              <p>Your email address will not be published.</p>
              <div class="my-3">
                <ul class="rating mb-0">
                  <li>
                    <a href="#">
                      <i class="fas fa-star fa-sm text-primary"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fas fa-star fa-sm text-primary"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fas fa-star fa-sm text-primary"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fas fa-star fa-sm text-primary"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="far fa-star fa-sm text-primary"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div class="md-form md-outline">
                  <textarea id="form76" class="md-textarea form-control pr-6" rows="4"></textarea>
                  <label for="form76">Your review</label>
                </div>
                <div class="md-form md-outline">
                  <input type="text" id="form75" class="form-control pr-6">
                  <label for="form75">Name</label>
                </div>
                <div class="md-form md-outline">
                  <input type="email" id="form77" class="form-control pr-6">
                  <label for="form77">Email</label>
                </div>
                <div class="text-right pb-2">
                  <button type="button" class="btn btn-primary">Add a review</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import {toast} from 'bulma-toast'

export default {
  name: "ProductDetail",
  data() {
    return {
      product: {},
      quantity: 1
    }
  },
  mounted() {
    this.getProduct()
  },
  methods: {
    async getProduct() {
      this.$store.commit('setIsLoading', true)
      const product_slug = this.$route.params.shoes_slug

      await axios
        .get(`api/v1/shoes/${product_slug}`)
        .then(response => {
          this.product = response.data

          document.title = this.product.title + ' | The Loop'
        })
        .catch(error => {
          console.log(error)
        })

      this.$store.commit('setIsLoading', false)
    },
    addToCart() {
      if (isNaN(this.quantity || this.quantity < 1)) {
        this.quantity = 1
      }

      const item = {
        product: this.product,
        quantity: this.quantity
      }

      this.$store.commit('addToCart', item)

      toast({
        message: 'The product was added to the cart',
        type: 'is-success',
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: 'bottom-right'
      })
    }
  }
}
</script>

<style scoped>
  main {
    padding-top: 10%;
  }
</style>
