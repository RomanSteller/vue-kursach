<template>
<div>

    <div v-for="room in rooms" :key="room.id">
        <div class="name">
          {{room.id}}
          {{room.name}}
          <router-link :to="{name:'room',params:{id:room.id}}">Перейти в комнату</router-link>
        </div>
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
  mounted() {
    this.fetchRooms();
  },
  methods:{
    fetchRooms(){
      let id = this.$route.params.id;
      axios.post('/api/my-rooms/?id='+id).then(res=>{
        this.rooms = res.data.rooms;
        console.log(this.rooms)
      });
    }
  }
}
</script>

<style scoped>

*{
  font-family: 'Noto Sans', sans-serif;
}

.name{
  background-color: white;
  margin: 10px;
  border-radius: 7px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;

}

a{
  border: 0;
  background-color: #0086b3;
  color: white;
  font-size: 14px;
  padding: 10px 10px;
  border-radius: 4px;
  text-decoration: none;
}




</style>