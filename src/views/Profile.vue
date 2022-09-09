<template>
 <div class="container mt-3" >
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">View Profile</p>
        <p class="fst-italic">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit rem ut reprehenderit nemo! Similique consequuntur ab voluptates temporibus mollitia vitae ipsa quas, aspernatur exercitationem corporis laboriosam sunt, veniam vero inventore?</p>
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
  <div class="container" v-if="!loading && isNext()">
    <div class="row align-items-center">
      <div class="col-md-4">
        <img :src="contact.photo" alt="" class="contact-img-big" width="150" height="150" style="border-radius:50%">
      </div>
      <div class="col-md-6">
        <ul class="list-group">
          <li class="list-group-item">Name: <span class="fw-bold">{{contact.name}}</span></li>
          <li class="list-group-item">Email: <span class="fw-bold">{{contact.email}}</span></li>
          <li class="list-group-item">Mobile: <span class="fw-bold">{{contact.phone}}</span></li>
          <li class="list-group-item">Company: <span class="fw-bold">{{contact.company}}</span></li>
          <li class="list-group-item">Segment: <span class="fw-bold">{{contact.title}}</span></li>
          <li class="list-group-item">Group: <span class="fw-bold">{{group.name}}</span></li>

        </ul>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <router-link to="/" class="btn btn-secondary" aria-hidden="true"><i class="fa fa-arrow-left"> Back</i></router-link>
      </div>
    </div>
  </div>

</template>

<script>
import { ContactService } from '../../services/ContactService'
import Spinner from '@/components/Spinner.vue'


export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Profile",
    data: function () {
        return {
            userID: this.$route.params.id,
            loading: false,
            errorMessage: null,
            contact: {},
            group: {}
        };
    },
    created: async function () {
        try {
          this.loading = true;
          let res = await ContactService.getContact(this.userID);
          let groupQuery = await ContactService.getGroup(res.data);
          this.group = groupQuery.data;
          this.contact = res.data;
          this.loading = false;
        }
        catch (err) {
          this.errorMessage = err;
        }
    },
    methods: {
      isNext: function(){
        return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0
      }
    },
    components: { Spinner }
}

</script>

<style>
  
</style>


