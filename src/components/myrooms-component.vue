<template>
<div>
    <div v-for="(room,name,i) in rooms" :key="i">
        <h1>{{name}}</h1>
    </div>
</div>
</template>

<script>
import axios from 'axios';


export default {
  name: "rooms-component",
  data(){
    return{
      rooms:null
    }
  },
  created() {
    this.fetchRooms();
  },
  methods:{
    async fetchRooms(){
      let id = this.$route.params.id;
      const res = await axios.post('/api/my-rooms/?id='+id);
      this.rooms = res.data;
      console.log(res.data.rooms)

    }
  }
}
</script>

<style scoped>

</style>