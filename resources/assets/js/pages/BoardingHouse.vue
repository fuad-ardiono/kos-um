<template>
    <b-container>
        <!-- Datalist kost per kecamatan -->
        <div v-if="boardingHouseData.length !== 0">
            <h3>{{ $route.query.area }}</h3><br>
            <div>
                <b-row>
                    <b-col cols='4' v-for="obj in boardingHouseData" :key="obj.id" style="margin-bottom:10px;">
                            <b-card
                                :title="obj.name"
                                :img-src="obj.image"
                                :img-alt="obj.name"
                                img-top
                                style="max-width: 20rem;"
                                class="mb-2"
                            >
                                <b-card-text>
                                {{ obj.address }}
                                </b-card-text>

                                <router-link :to="{path: `/boarding-house/${obj.id}`}" class="btn btn-primary">Detail Alamat</router-link>
                            </b-card>
                    </b-col>
                </b-row>
            </div>
        </div>

        <!-- List kost -->
        <div v-else-if="boardingHouse.hasOwnProperty('id')">
            <h3>{{ boardingHouse.name }}</h3>
            <b-row>
                <img :src="boardingHouse.image" alt="" style="max-width:50%;max-height:50%;margin-right:10px;">
                <div v-html="boardingHouse.google_maps_embed"></div>
            </b-row>
            <b-row>
                <p>{{ boardingHouse.name }} {{ boardingHouse.address }}</p>
            </b-row>
        </div>
        <h1 v-else class="text-center" style="margin-top:30%;margin-bottom:30%;">Data Kost Tidak Ada</h1>
    </b-container>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
    name: "BoardingHouse",
    data(){
        return {
            boardingHouse: {},
            boardingHouseData: [],
            urlQuery: '',
            noData: false
        }
    },
    watch: {
        "$route.params.id"(val) {
            if(typeof this.$route.params.id !== 'undefined'){
                this.fetchBoardingHouse()
                  this.boardingHouseData = []
            }
        },
        "$route.query"(val) {
            this.boardingHouse = {}
            console.log('match', this.$route.params)
            if(!this.$route.params.hasOwnProperty("id")){
                this.getQueryUrl()
                this.fetchBoardingHouseData()
            }
        }
    },
    methods: {
        async isEmpty(data){
            console.log('lodash check empty obj', _.isEmpty({data}))
            return await _.isEmpty({data})
        },
        async fetchBoardingHouse(){
            axios.get(`/api/v1/boarding-house/${this.$route.params.id}`).then((res) => {
                this.boardingHouse = res.data
            })
        },
        async fetchBoardingHouseData(){
            if(this.urlQuery !== ''){
                axios.get(`/api/v1/boarding-house${this.urlQuery}`).then((res) => {
                    this.boardingHouseData = res.data
                })
            }
        },
        async getQueryUrl(){
            if(typeof this.$route.query.area !== 'undefined'){
                this.urlQuery = `?area=${this.$route.query.area}`
            }

            if(typeof this.$route.query.search !== 'undefined'){
                this.urlQuery = this.urlQuery.concat(`&search=${this.$route.query.search}`)
            }
        },
        async thinkData(){
        }
    },
    created(){
        console.log(this.$route.query)
        if(typeof this.$route.params.id !== 'undefined'){
            this.fetchBoardingHouse()
        }

        this.getQueryUrl()
        this.fetchBoardingHouseData()
    }
}
</script>

<style>.mapouter{position:relative;text-align:right;height:300px;width:300px;}.gmap_canvas {overflow:hidden;background:none!important;height:300px;width:300px;}</style>