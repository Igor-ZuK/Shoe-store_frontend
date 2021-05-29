<template>
  <div class="page-success">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Благодарим за оплату</h1>

        <p class="order-details">Ваш заказ будет обработан в течение 48 часов.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Success",
  mounted() {
    document.title = 'Success | The Loop'
  },

}
</script>

<style scoped>
  .page-success {
    height: 54vh;
    margin-top: 5%;
  }

  .order-details {
    text-align: center;
    margin-top: 5vh;
    font-weight: 500;
    font-size: 17px;
  }
</style>
