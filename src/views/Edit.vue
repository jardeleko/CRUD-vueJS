<template>
   <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">Edit Contact</p>
        <p class="fst-italic">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae nostrum officiis quibusdam cumque veniam ducimus voluptate. Animi numquam harum, ea cum accusamus possimus molestiae vitae, laboriosam nisi corporis similique quidem.</p>
      </div>
    </div>
  </div>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="updateUser()">
          <div class="mb-2">
            <input v-model="contact.name" type="text" class="form-control" placeholder="Name">
          </div>
          <div class="mb-2">
            <input v-model="contact.photo" type="text" class="form-control" placeholder="Photo URI">
          </div>
          <div class="mb-2">
            <input v-model="contact.email" type="email" class="form-control" placeholder="Email">
          </div>
          <div class="mb-2">
            <input v-model="contact.phone" type="text" class="form-control" placeholder="Phone (55) 988332211">
          </div>
          <div class="mb-2">
            <input v-model="contact.company" type="text" class="form-control" placeholder="Company">
          </div>
          <div class="mb-2">
            <input v-model="contact.title" type="text" class="form-control" placeholder="Title">
          </div>
          <div class="mb-2">
            <select v-model="contact.grouPID" class="form-control" v-if="groups.length > 0"> 
              <option selected>Select</option>
              <option :value="group.id" v-for="group of groups" :key="group.id">{{group.name}}</option>
            </select>
          </div>
          <div class="mb-2">
            <input type="submit" class="btn btn-success" value="Update"> 
          </div>
        </form>
      </div>
      <div class="col-md-4">
        <img :src="contact.photo" alt="" width="150" height="150" class="contact-img">
      </div>
    </div>
  </div>
  <pre>{{contact}}</pre>
</template>

<script>
import { ContactService } from '../../services/ContactService';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Edit',
  data: function () {
    return {
        userID: this.$route.params.id,
        loading: false,
        errorMessage: null,
        contact: {},
        group: []
    };
  },
  created: async function () {
    try {
      this.loading = true;
      let res = await ContactService.getContact(this.userID);
      let groupQuery = await ContactService.getAllGroups();
      this.groups = groupQuery.data;
      this.contact = res.data;
      this.loading = false;
    }
    catch (err) {
      this.errorMessage = err;
    }
  },
  methods: {
    updateUser: async function(){
      try{
        let res = await ContactService.putContact(this.contact, this.userID)
        if(res){
          return this.$router.push('/')
        }
        else{
          return this.$router.push(`/contact/edit/${this.userID}`)
        }
      }
      catch(err){
        console.log(err)
      }
    },  
    isNext: function(){
      return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0
    }
  },
}
</script>

<style>
  
</style>


