<template>
  <div>
    <ul class="pagination-page">
      <li>
        <button class="btn pagination-button"
                @click="goToPrevious"
                >Prev</button>
      </li>
      <li v-for="p in totalPages" :key="p">
        <button class="btn pagination-button"
                @click="changePage(p)"
                :class="{active: currentPage === p}"
        >{{ p }}
        </button>
      </li>
      <li>
        <button class="btn pagination-button"
                @click="goToNext"
                >Next</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: [
    'total',
    'item',
  ],
  data() {
    return {
      currentPage: 1,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.item)
    },
  },
  methods: {
    changePage(pageNumber) {
      this.currentPage = pageNumber
      this.$emit('page-changed', pageNumber)
    },
    goToPrevious() {
      if (this.currentPage > 1 && this.currentPage <= this.totalPages) {
        console.log(this.currentPage)
        this.changePage(this.currentPage - 1)
      }
    },
    goToNext() {
      if (this.currentPage >= 1 && this.currentPage < this.totalPages) {
        this.changePage(this.currentPage + 1)
      }
    }
  },
}
</script>

<style scoped>
.pagination-button {
  color: #fff;
  border-radius: 50%;
  padding: 9px 14px;
}

.active {
  background: #1da1f2;
}

.pagination-page {
  display: flex;
  position: relative;
  overflow: hidden;
  justify-content: center;
}

</style>
