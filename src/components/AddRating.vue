<template>
  <div class="star-rating">
    <label class="star-rating__star" v-for="(rating, index) in 5" :key="index"
           :class="{'is-selected': ((value >= rating) && value !== null)}"
           @mouseover="starOver(rating)"
           @mouseleave="value = tempValue"
           >
      <input class="star-rating star-rating__checkbox" type="radio"
             :value="rating"
             v-model="value"
             @click="setRating(rating)"
      >
      ★</label>
  </div>
</template>

<script>
import axios from "axios";
import {toast} from "bulma-toast";

export default {
  name: "AddRating",
  props: [
    'shoes_id',
    'user_rating'
  ],
  data() {
    return {
      shoesId: this.shoes_id,
      tempValue: 0,
      value: 0
    }
  },
  methods: {
    starOver(index) {
      this.tempValue = this.value
      this.value = index
    },
    async setRating(value) {
      this.tempValue = value
      this.value = value

      const data = {
        "star": this.value,
        "shoes": this.shoesId
      }

      await axios
        .post('/api/v1/rating/', data)
        .then(response => {
          toast({
            message: 'Ваша оценка была учтена',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: 'bottom-right'
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  watch: {
    shoes_id(value) {
      this.shoesId = value
    },
    user_rating(val) {
      val !== null ? this.value = val: 0
    }
  }
}
</script>

<style scoped lang="scss">
%visually-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}

.star-rating {

  &__star {
    display: inline-block;
    padding: 3px;
    vertical-align: middle;
    line-height: 1;
    font-size: 1.5em;
    color: #ABABAB;
    transition: color .2s ease-out;

    &:hover {
      cursor: pointer;
    }

    &.is-selected {
      color: #FFD700;
    }

    &.is-disabled:hover {
      cursor: default;
    }
  }

  &__checkbox {
    @extend %visually-hidden;
  }
}
</style>

