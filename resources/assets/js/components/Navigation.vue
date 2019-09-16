<template>
    <div>
  <b-navbar class="navigation" toggleable="lg">
    <b-navbar-brand href="#/" style="color: #304455;">Info Kost Balikpapan</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item><router-link :to="{path:'/boarding-house', query:{area:'Balikpapan Kota'}}">Kota</router-link></b-nav-item>
        <b-nav-item><router-link :to="{path:'/boarding-house', query:{area:'Balikpapan Timur'}}">Timur</router-link></b-nav-item>
        <b-nav-item><router-link :to="{path:'/boarding-house', query:{area:'Balikpapan Barat'}}">Barat</router-link></b-nav-item>
        <b-nav-item><router-link :to="{path:'/boarding-house', query:{area:'Balikpapan Selatan'}}">Selatan</router-link></b-nav-item>
        <b-nav-item><router-link :to="{path:'/boarding-house', query:{area:'Balikpapan Utara'}}">Utara</router-link></b-nav-item>
        <b-nav-item><router-link :to="{path:'/boarding-house', query:{area:'Balikpapan Tengah'}}">Tengah</router-link></b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto search-box">
        <b-nav-form style="margin-top:10px">
          <b-form-input size="sm" class="mr-sm-2 p-1" placeholder="Kost Budi"></b-form-input>
          <b-button disabled size="sm" class="my-2 my-sm-0 search-btn" type="submit">Cari Kost</b-button>
        </b-nav-form>

        <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown> -->

        <b-nav-item-dropdown right v-show="$store.state.loggedIn === 1">
          <template slot="button-content"><em>{{ $store.state.user ? $store.state.user.name : null }}</em></template>
          <b-dropdown-item href="#" @click="handleAddBoardingHouse">Tambah Kost</b-dropdown-item>
          <b-dropdown-item href="#" @click="handleListBoardingHouse">List Kost</b-dropdown-item>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Navigation",
    methods: {
        async logout(){
          axios.post('/api/v1/logout').then((res) => {
            this.$store.commit('SET_LOGGED_OUT')
            this.$toastr.success('','Logout berhasil', {progressBar:true,})
            this.$router.push('/')
          }).catch((err) => {
            this.$toastr.error('','Logout gagal', {progressBar:true,})
          })
        },
        async handleAddBoardingHouse(){
          this.$router.push('/admin/panel/tambah-kost')
        },
        async handleListBoardingHouse(){
          this.$router.push('/admin/panel/list-kost')
        }
    }
}
</script>

<style lang="scss" scoped>
    .navbar-nav {
      li {
        a {
          color: #304455!important;
        }

        a:hover {
          color: #007bff!important;
        }
      }
    }

    .navigation {
        background-color: #fff!important;
        color: #304455!important;
        box-shadow: 0 0 1px rgba(0,0,0,0.25);
        transition: background-color 0.3s ease-in-out;
    }

    .search-box { 
      input[type="text"] {
        border-color: #007bff!important;
      }

      .search-btn {
      background-color: #fff!important;
      color: #007bff!important;
      border-color: #007bff!important;
    }
    }
</style>