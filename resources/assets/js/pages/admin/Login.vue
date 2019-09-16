<template>
  <b-container style="margin-bottom:25%;">
      <b-row>
          <h3>
              Login Admin Panel
          </h3>
      </b-row>
      <b-row>
        <b-col cols="8">
    <b-form @submit="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          required
          type="password"
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
        </b-col>
      </b-row>
  </b-container>
</template>

<script>
    import axios from 'axios';

  export default {
    data() {
      return {
        form: {
          email: '',
          password: ''
        },
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        axios.post('/api/v1/login', this.form).then((res) => {
            this.$toastr.success('','Login berhasil', {progressBar:true,})
            this.$router.push('/')
            this.$store.commit('SET_LOGGED_IN', res.data.user)
        }).catch((err) => {
            this.$toastr.error('','Email atau Password salah', {progressBar:true,})
        })
      },
    },
    beforeMount(){
        if(this.$store.state.loggedIn === 1){
          this.$router.push('/')
        } else {
          let admin = prompt("Username :")

          if(admin === 'admin'){
              let password = prompt("Password :")

              if(password === 'um2019'){
                  this.$router.push('/admin/panel/login')
              } else {
                  this.$router.push('/')
              }
          } else {
              this.$router.push('/')
          }
        }
    }
  }
</script>