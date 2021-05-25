<template>
  <div>
    <ul class="pagination">
      <li v-for="p in totalPages" :key="p">
        <button class="pagination-button"
                @click="changePage(p)"
                :class="{active: currentPage === p}"
        >{{ p }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['total', 'page'],
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.item)
    }
  },
  methods: {
    changePage(pageNumber) {
      this.currentPage = pageNumber
      this.$emit('page-changed', pageNumber)
    }
  }
}
</script>

<style scoped>
  .pagination-button {
    background: #7a58b1;
    color: #1c1d21;
    border: 1px solid #3b5998;
  }

  .active {
    background: #1da1f2;
  }
</style>
