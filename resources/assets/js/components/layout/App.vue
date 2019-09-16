<template>
	<div>
		<Navigation/>
		<div class="app-content">
			<router-view></router-view>
		</div>
		<Footer/>
	</div>
</template>

<script>
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import axios from 'axios'

export default {
  name: 'App',
  components: {
	  Navigation,
	  Footer
  },
  beforeCreate(){
	  axios.get('/api/v1/auth/check').then((res) => {
		  if(res.data.loggedIn === 1){
			  this.$store.commit('SET_LOGGED_IN', res.data.user)
			  console.log('aku login fuad')
		  }
	  }).catch((err) => {
		  console.log('throw err')
		  this.$store.commit('SET_LOGGED_OUT')
	  })
  }
}
</script>

<style>
	.app-content {
		padding-top: 2%;
	}
</style>