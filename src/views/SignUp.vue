<template>
  <div class="login nonborderbox">
    <div class="form-box">
      <form  @submit.prevent="submitForm">
        <h1 class="form-title">Sign Up</h1>
        <input type="text" name="/" placeholder="Username" v-model="username">
        <input type="password" name="" placeholder="Password" v-model="password">
        <input type="password" name="" placeholder="Password" v-model="password2">
        <input type="submit" name="" value="Sign Up">
      </form>

      <p class="login-link">Or <router-link to="/log-in">click here </router-link> to login in!</p>
    </div>
    <div class="alert alert-danger" role="alert" v-if="errors.length">
      <p v-for="error in errors" :key="error">{{ error }}</p>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import {toast} from "bulma-toast";

export default {
  name: "SignUp",
  data() {
    return {
      username: '',
      password: '',
      password2: '',
      errors: ''
    }
  },
  mounted() {
    document.title = 'Sign Up | The Loop'
  },
  methods: {
    submitForm() {
      this.errors = []

      if (this.username === '') {
        this.errors.push('The username is missing')
      }

      if (this.password === '') {
        this.errors.push('The password too short')
      }

      if (this.password2 !== this.password) {
        this.errors.push('The passwords doesn\'t match')
      }

      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password
        }

        axios
          .post('/auth/users/', formData)
          .then(response => {
            toast({
              message: 'Account created, please log in!',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 3000,
              position: 'bottom-right',
            })

            this.$router.push('/log-in')
          })
          .catch(error => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(`${error.response.data[property]}`)
              }

              console.log(JSON.stringify(error.response.data))
            } else if (error.message) {
              this.errors.push('Something went wrong. Please try again')

              console.log(JSON.stringify(error))
            }
          })
      }

    }
  }
}
</script>

<style scoped>
@import "../assets/css/login.css";
@import "~bulma/css/bulma.css";

.form-box {
  top: 58%;
}

.nonborderbox * {
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}

.login-link {
  position: absolute;
  color: white;
  text-align: center;
  right: 26%;
}

.alert {
  position: absolute;
  bottom: 1px;
  right: 2%;
  color: #000;
  opacity: 0.9;
}

</style>
