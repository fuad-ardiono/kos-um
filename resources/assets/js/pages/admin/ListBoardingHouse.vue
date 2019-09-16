<template>
    <b-container>
        <h3>List Data Kost</h3>

        <b-table-simple hover small caption-top responsive>
            <b-thead head-variant="light">
            <b-tr>
                <b-th>Nama Kost</b-th>
                <b-th>Alamat</b-th>
                <b-th>Aksi</b-th>
            </b-tr>
            </b-thead>
            <b-tbody>
                 <b-tr v-for="obj in boardingHouseData" :key="obj.id">
                    <b-td>{{ obj.name }}</b-td>
                    <b-td>{{ obj.address }}</b-td>
                    <b-td><b-button variant="outline-primary" @click="handleUpdateBtn(obj.id)" style="margin-right:5px">Update</b-button> <b-button variant="outline-danger" @click="handleDestroyBtn(obj.id)">Delete</b-button></b-td>
                </b-tr>
            </b-tbody>
            <b-tfoot>
            <b-tr>
                <b-td colspan="7" variant="secondary" class="text-right">
                Total Rows: <b>{{ boardingHouseData.length }}</b>
                </b-td>
            </b-tr>
            </b-tfoot>
        </b-table-simple>
    </b-container>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name:"ListBoardingHouse",
    data(){
        return{
            boardingHouseData:[]
        }
    },
    methods: {
        async handleUpdateBtn(id){
            this.$router.push({path:`/admin/panel/update-kost/${id}`})
        },
        async handleDestroyBtn(id){
            Swal.fire({
                title: 'Apakah anda yakin?',
                text: "Anda tidak bisa mengembalikan aksi ini!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Iya, delete!'
                }).then((result) => {
                if (result.value) {
                    axios.delete(`/api/v1/boarding-house/${id}`).then((res) => {
                         Swal.fire(
                        'Deleted!',
                        'Data kost telah di delete',
                        'success'
                        )
                        this.fetchBoardingHouseData()
                    }).catch((err) => {
                        Swal.fire(
                        'Gagal delete!',
                        'Gagal delete data kost',
                        'error'
                        )
                    })
                }
            })
        },
        async fetchBoardingHouseData(){
            let debug = {}
            axios.get('/api/v1/boarding-house').then((res) => {
                this.boardingHouseData = res.data
            }).catch((err) => {
                debug.err = err
            })

            console.log('fetchBoardingHouseData', debug)
        }
    },
    created(){
        this.fetchBoardingHouseData()
    },
    beforeMount(){
        if(this.$store.state.loggedIn === 0){
            this.$router.push('/')
        }
    }
}
</script>