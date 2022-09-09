<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">Add Contact</p>
        <p class="fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi laudantium est rerum? Illo dolore aliquid harum perspiciatis deserunt qui culpa hic voluptatum inventore saepe blanditiis repellendus quidem, officia obcaecati excepturi!</p>
      </div>
    </div>
  </div>
  <div class="container mt-3" >
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="submitForm()">
          <div class="mb-2">
            <input v-model="contact.name" type="text" class="form-control" placeholder="Name">
          </div>
          <div class="mb-2">
            <input v-model="contact.photo"  type="text" class="form-control" placeholder="Photo URI">
          </div>
          <div class="mb-2">
            <input v-model="contact.email" type="email" class="form-control" placeholder="Email">
          </div>
          <div class="mb-2">
            <input v-model="contact.phone"  type="text" class="form-control" placeholder="Phone (55) 988332211">
          </div>
          <div class="mb-2">
            <input v-model="contact.company"  type="text" class="form-control" placeholder="Company">
          </div>
          <div class="mb-2">
            <input v-model="contact.title"  type="text" class="form-control" placeholder="Segment">
          </div>
          <div class="mb-2">
            <select v-model="contact.grouPID" class="form-control" v-if="groups.length > 0"> 
              <option value="">Select Group</option>
              <option :value="group.id" v-for="group of groups" :key="group.id" >{{group.name}}</option>
            </select>
          </div>
          <div class="mb-2">
            <input type="submit" class="btn btn-success" value="Create"> 
          </div>
        </form>
      </div>
      <div class="col-md-4">
        <img :src="contact.photo ? contact.photo : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'" class="contact-img" width="150" height="150"/> 
      </div>
    </div>
  </div>
</template>

<script>
import { ContactService } from '../../services/ContactService';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Create',
  data: function (){
    return {
      contact : {
        id: '',
        name: '',
        company: '',
        email: '',
        title: '',
        phone: '',
        photo: '',
        grouPID: ''
      },
      groups : []
    }
  },
  created: async function() {
    try{ 
      let res = await ContactService.getAllGroups()
      this.groups = res.data
    }
    catch(err){
      console.log(err)
    }
  },
  methods: {
    submitForm: async function() {
      try{
        let res = await ContactService.createContact(this.contact) 
        if(res){
          return this.$router.push('/') 
        }
        else{
          return this.$router.push('/contact/create')
        }
      }
      catch (err){
        console.log(err)
      }
    }
  }
}
</script>

<style>
  
</style>


