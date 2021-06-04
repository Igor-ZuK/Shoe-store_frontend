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
              <Rating :rating_star="product.middle_star"/>
              <p><span class="mr-1"><strong>${{ product.price }}</strong></span></p>
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
                    <td class="pl-0 pb-0 w-25">Кол-во</td>
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
                class="fas fa-shopping-cart pr-2"></i>
                Добавить
              </button>
            </div>
          </div>
        </section>
        <div class="classic-tabs">
          <div class="tab-content" id="advancedTabContent">
            <div class="tab-pane fade show active mb-5" id="description" role="tabpanel"
                 aria-labelledby="description-tab">
              <h5>Описание:</h5>
              <p class="small text-muted text-uppercase mb-2">{{ product.fabricator }} {{ product.title }}</p>
              <Rating :rating_star="product.middle_star"/>
              <h6>${{ product.price }}</h6>
              <p class="pt-1">{{ product.description }}</p>
            </div>

            <hr>

            <div class="tab-pane fade show active" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
              <h5><span>{{ product.total_comments }}</span> комментариев для <span>{{ product.title }}</span></h5>
              <template v-if="product.total_comments">
                  <div class="media mt-3 mb-4" v-for="comment in comments" :key="comment.id">
                    <img class="d-flex mr-3 z-depth-1"
                         src="https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg"
                         width="62" alt="Generic placeholder image">
                    <div class="media-body">
                      <div class="d-flex justify-content-between">
                        <p class="mt-1 mb-2">
                          <strong>{{ comment.author_name }} </strong>
                          <span>– </span><span>{{ getDate(comment.pub_date) }}</span>
                        </p>
                      </div>
                      <p class="mb-0">{{ comment.content }}</p>
                      <i class="fas fa-reply" @click="reviewComment(comment.author_name, comment.id)"></i>
                      <div class="media mt-4 mb-4 ml-3" v-for="review in comment.children" :key="review.id">
                        <img class="d-flex mr-3 z-depth-1"
                             src="https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg"
                             width="62" alt="Generic placeholder image">
                        <div class="media-body">
                          <div class="d-flex justify-content-between">
                            <p class="mt-1 mb-2">
                              <strong>{{ review.author_name }} </strong>
                              <span>– </span><span>{{ getDate(review.pub_date) }}</span>
                            </p>
                          </div>
                          <p class="mb-0">{{ review.content }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              <hr>
              <h5 class="mt-4">Добавить оценку</h5>
              <div class="notification is-danger error-block" v-if="errors.length">
                <p v-for="error in errors" :key="error">{{ error }}</p>
              </div>
              <div class="my-3">
                <AddRating :shoes_id="product.id" :user_rating="product.rating_user" />
              </div>
              <div>
                <h5 class="mt-4">Добавить комментарий</h5>
                <div class="md-form md-outline">
                  <textarea id="form76"
                            class="md-textarea form-control pr-6"
                            rows="4"
                            v-model="commentText"
                            placeholder="Ваш отзыв"
                  ></textarea>
                </div>
                <div class="text-right pb-2">
                  <button type="button" class="btn btn-primary" @click="sendReview">Добавить</button>
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
import Rating from "@/components/Rating";
import AddRating from "@/components/AddRating";

export default {
  name: "ProductDetail",
  components: {
    Rating,
    AddRating
  },
  data() {
    return {
      product: {},
      quantity: 1,
      comments: {},
      commentText: '',
      parent: null,
      rating: 0,
      errors: [],
      isHover: false
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
          this.comments = this.product.comments

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
    },
    async sendReview() {
      this.errors = []

      if (!this.$store.state.isAuthenticated) {
        this.errors.push('Комментарии могут добавлять только аутентифицированные пользователи!')
      }

      if (this.commentText === '') {
        this.errors.push('Ваш комментарий пуст!')
      }

      if (!this.errors.length) {

        const data = {
          "content": this.commentText,
          "shoes_id": this.product.id,
          "parent": this.parent
        }
        console.log(data)

        this.$store.commit('setIsLoading', true)
        await axios.post('/api/v1/comment/', data)
          .then(response => {
            toast({
              message: 'Комментарий был успешно добавлен',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right'
            })

            window.location.reload()
          })
          .catch(error => {
            this.errors.push("Something went wrong...Pls try again.")

            console.log(error)
          })

        this.$store.commit('setIsLoading', false)
      }

      this.parent = null
    },
    getDate(dateStr) {
      const date = new Date(dateStr)

      return `
        ${date.toLocaleString('defaults', {month: 'long'})} ${date.getDate()}, ${date.getFullYear()}`
    },
    reviewComment(author_name, author_id) {
      this.commentText = author_name + ', '
      this.parent = author_id
    },
    setRating() {

    }
  },
}

</script>

<style scoped>
main {
  padding-top: 10%;
}

.error-block {
  color: #4a4a4a;
  font-weight: 500;
  font-size: 17px;
  margin-top: 10px;
}

.gold-star {
  color: gold;
  font-size: 20px;
}

</style>
