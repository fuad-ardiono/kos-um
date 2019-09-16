<template>
    <b-container>
        <b-row>
            <h3>Tambah Kost</h3>
        </b-row>

        <b-row>
            <b-col cols="8">
                <b-form @submit="onSubmit">
                <b-form-group
                    id="input-group-1"
                    label="Nama :"
                    label-for="input-1"
                >
                    <b-form-input
                    id="input-1"
                    type="text"
                    v-model="form.name"
                    required
                    placeholder="Enter Nama"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Kecamatan :" label-for="input-2">
                    <b-form-input
                    id="input-2"
                    required
                    v-model="form.address"
                    type="text"
                    placeholder="Enter Kecamatan"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-3" label="Google Embed Maps :" label-for="input-3">
                    <textarea id="input-3" required cols="89" rows="10" v-model="form.google_maps_embed"></textarea>
                    <span>Gunakan <a href="https://www.embedgooglemap.net/" target="_blank">https://www.embedgooglemap.net/</a> untuk mendapatkan code Google Embed Maps</span>
                </b-form-group>

                <b-form-group id="input-group-4" label="Foto :" label-for="input-4">
                    <!-- <b-form-file
                    id="input-4"
                    v-model="image"
                    @input="handleImageFile($event)"
                    placeholder="Enter file foto secara umum"
                    ></b-form-file> -->
                    <img :src="form.image" style='max-width:300px;max-height:300px' alt="">
                    <input type="file" id="input-4" ref="file">
                </b-form-group>

                <b-button type="submit" variant="primary">{{`${$route.params.hasOwnProperty('id') ? 'Update' : 'Kirim'}`}}</b-button>
                <b-button @click="handleBack" variant="secondary">Kembali</b-button>
                </b-form>
            </b-col>
      </b-row>
    </b-container>
</template>

<script>
import axios from 'axios'

export default {
    name: "AddBoardingHouse",
    data(){
        return {
            form:{
                name: '',
                address: '',
                google_maps_embed: '',
                image: ''
            },
            image: ''
        }
    },
    methods: {
        async handleBack(){
            this.$router.push('/admin/panel/list-kost')
        },
        async handleFileUpload(){
            let debug = {}
            return new Promise((resolve, reject) => {
                if(typeof this.$refs.file.files[0] !== 'undefined') {
                    this.file = this.$refs.file.files[0]
                    debug.inputFileData = this.$refs.file
                    let formData = new FormData()
                    formData.append('boarding_house_img', this.file);

                    axios.post( '/api/v1/boarding-house/image', formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then((res) => {
                        debug.res = res;
                        res.data.statusFile = 'haveFile'
                        resolve(res.data)
                    })
                    .catch((err) => {
                        debug.err = err;
                        reject(new Error('Image upload failed'))
                    });
                } else {
                    resolve({statusFile: 'noFile'})
                }
                console.log('handleFileUpload', debug)
            })
        },
        async handleImageFile(e){
            const getBase64 = new Promise((resolve, reject) => {
                let file = this.image
                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onloadend = function () {
                    resolve(reader.result)
                };

                reader.onerror = function (error) {
                    reject(error)
                };
            })

            getBase64.then((data) => {
                this.form.image = data;
            }).catch((err) => {
                this.$toastr.error('','File foto tidak valid silahkan pilih file foto yang valid', {progressBar:true,})
                console.log(err);
            })
        },
        async onSubmit(e){
            let debug = {}
            e.preventDefault();

            this.handleFileUpload().then(async (data) => {
                debug.data = data

                if(data.statusFile === 'haveFile'){
                    this.form.image = data.path                    
                } else {
                    delete this.form.image
                }

                if(this.$route.params.hasOwnProperty('id')){
                    //update
                    axios.put(`/api/v1/boarding-house/${this.$route.params.id}`, this.form).then((res) => {
                        this.$toastr.success('','Berhasil update kost baru', {progressBar:true,})
                        this.$router.push('/')
                    }).catch((err) => {
                        this.$toastr.error('', 'Gagal update kost baru', {progressBar:true})
                    })
                } else {
                    //create
                    axios.post('/api/v1/boarding-house', this.form).then((res) => {
                        this.$toastr.success('','Berhasil input kost baru', {progressBar:true,})
                    }).catch((err) => {
                        this.$toastr.error('', 'Gagal input kost baru', {progressBar:true})
                    })
                }
                
            }).catch((err) => {
                this.$toastr.error('', 'Upload file image gagal', {progressBar:true})
            })
           
            console.log('onSubmit', debug)
        },
        async fetchBoardingHouse(){
            let debug = {}
             axios.get(`/api/v1/boarding-house/${this.$route.params.id}`).then((res) => {
                this.form = res.data
            })

            debug.inputFileData = this.$refs.file

            console.log('fetchBoardingHouse', debug)
        }
    },
    beforeMount(){
        if(this.$store.state.loggedIn === 0){
            this.$router.push('/')
        }

        if(typeof this.$route.params.id !== 'undefined'){
            this.fetchBoardingHouse()
        }
    }
}
</script>