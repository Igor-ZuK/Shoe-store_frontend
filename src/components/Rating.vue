<template>
  <ul class="rating mb-0">
    <template v-if="rating_star">
      <li v-for="star in rating_star" :key="star">
        <i class="fas fa-star fa-sm"></i>
      </li>
    </template>
    <li v-for="star in (5 - rating_star)" :key="star">
      <i class="far fa-star fa-sm"></i>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Rating",
  props: [
    'rating_star'
  ]
}
</script>

<style scoped>
  .fa-star {
    color: gold;
  }
</style>
