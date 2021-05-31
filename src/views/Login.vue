<template>
  <div class="login nonborderbox">
    <div class="form-box">
      <form @submit.prevent="submitForm">
        <h1 class="form-title">Login</h1>
        <input type="text" name="/" placeholder="Username" v-model="username">
        <input type="password" name="" placeholder="Password" v-model="password">
        <input type="submit" name="" value="Login">
      </form>

      <p class="login-link">Or <router-link to="/sign-up">click here </router-link> to sign up!</p>
    </div>

    <div class="alert alert-danger" role="alert" v-if="errors.length">
      <p v-for="error in errors" :key="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      errors: []
    }
  },
  mounted() {
    document.title = 'Login | The Loop'
  },
  methods: {
    async submitForm() {
      axios.defaults.headers.common["Authorization"] = ""

      localStorage.removeItem("token")

      const formData = {
        username: this.username,
        password: this.password
      }

      console.log(formData)

      await axios
        .post("auth/token/login/", formData)
        .then(response => {
          const token = response.data.auth_token

          this.$store.commit('setToken', token)

          axios.defaults.headers.common["Authorization"] = "Token " + token

          localStorage.setItem("token", token)

          const toPath = this.$route.query.to || '/cart'

          this.$router.push(toPath)
        })
        .catch(error => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${error.response.data[property]}`)
            }
          } else {
            this.errors.push('Something went wrong. Please try again')

            console.log(JSON.stringify(error))
          }
        })
    }
  }
}
</script>

<style scoped>
@import "../assets/css/login.css";

.form-box {
  top: 58%;
}

.nonborderbox * {
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}

.alert {
  position: absolute;
  bottom: 1px;
  right: 2%;
  color: #000;
  opacity: 0.9;
}

</style>
