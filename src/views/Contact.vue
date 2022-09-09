<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">Contact Manager
          <router-link to="/contact/create" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> New</router-link>
        </p>
        <p class="fst-italic">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, error delectus corporis dolor beatae aspernatur necessitatibus! Consequatur non beatae eaque molestias. Obcaecati consequuntur, dolor voluptatem corrupti quisquam voluptates libero eaque.
        </p>
        
        <form action="">
          <div class="row">
            <div class="col-md-6">
              <div class="row">
                <div class="col">
                  <input type="text" class="form-control" placeholder="Search Name">
                </div>
                <div class="col">
                  <button class="btn btn-outline-success"><i class="fa-sharp fa-solid fa-magnifying-glass"></i></button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--spinner class-->
  <div v-if="loading">
    <div class="container">
      <div class="row">
        <div class="col">
          <Spinner/>
        </div>
      </div>
    </div>
  </div>
  <!--Error Message-->
  <div v-if="!loading && errorMessage">
    <div class="container">
      <div class="row">
        <div class="col mt-3">
          <p class="h3 text-danger fw-bold">{{errorMessage}} </p>
        </div>
      </div>
    </div>
  </div>
  <div class="container mt-3" v-if="contacts.length > 0">
    <div class="row">
      <div class="col-md-6" v-for="contact of contacts" :key="contact">
        <div class="card my-2 list-group-item-danger shadow-lg" style="background-color: #fff2cc !important; border-radius: 20px;"> 
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-sm-4">
                <img :src="contact.photo" alt="" class="contact-img" width="130" height="130">
              </div>
              <div class="col-sm-7">
                <ul class="list-group">
                  <li class="list-group-item fw-bold" style="background-color: #fff2cc !important; border: none; border-bottom: 2px solid gray; ">Name: <span class="fw-italic" style="color:gray;"> {{contact.name}}</span></li>
                  <li class="list-group-item fw-bold" style="background-color: #fff2cc !important; border: none; border-bottom: 2px solid gray; ">Email: <span class="fw-italic" style="color:gray;"> {{contact.email}}</span></li>
                  <li class="list-group-item fw-bold" style="background-color: #fff2cc !important; border: none; border-bottom: 2px solid gray; ">Mobile: <span class="fw-italic" style="color:gray;"> {{contact.phone}}</span></li>
                </ul>
              </div>
              <div class="col-sm-1 d-flex flex-column justify-content-center align-items-center">
                <router-link :to="`/contact/profile/${contact.id}`" class="btn btn-warning my-1">
                  <i class="fa fa-eye"></i>
                </router-link>
                <router-link :to="`/contact/edit/${contact.id}`" class="btn btn-primary my-1">
                  <i class="fa fa-pen"></i>
                </router-link>
                <button class="btn btn-danger my-1" @click="deleteAccount(contact.id)">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br><br><br>
</template>

<script>
import { ContactService } from '../../services/ContactService'
import Spinner from '@/components/Spinner.vue'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Contact",
    data: function () {
        return {
            loading: false,
            contacts: [],
            errorMessage: null
        };
    },
    created: async function () {
        try {
            this.loading = true;
            let res = await this.getAllContactsData();
            this.contacts = res.data;
            this.loading = false;
        }
        catch (err) {
            this.errorMessage = err;
            this.loading = false;
        }
    },
    methods: {
        deleteAccount: async function(id){
          try{
            this.loading = true
            let res = await ContactService.deleteContact(id)
            if(res){
              let res = await this.getAllContactsData();
              this.contacts = res.data;
              this.loading = false;
            }else{
              console.log('error')
            }
          }catch(err){
            console.log(err)
          }
        },
        getAllContactsData: async function () {
            return await ContactService.getAllContacts();
        }
    },
    components: { Spinner }
}
</script>

<style>
  
</style>


