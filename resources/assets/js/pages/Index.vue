<template>
    <div>
        <b-container>
            <h3>Rekomendasi Kost</h3>

            <div>
                <b-row>
                    <b-col cols='4' v-for="obj in boardingHouse" :key="obj.id" style="margin-bottom:10px;">
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
        </b-container>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Index',
    data(){
        return{
            boardingHouse:[]
        }
    },
    created(){
        axios.get('/api/v1/boarding-house?recomended=true').then((res) => {
            this.boardingHouse = res.data
        })
    }
}
</script>

<style lang="scss" scoped>
    h3 {
        color:  #304455;
    }
</style>

<style>.mapouter{position:relative;text-align:right;height:300px;width:300px;}.gmap_canvas {overflow:hidden;background:none!important;height:300px;width:300px;}</style>


