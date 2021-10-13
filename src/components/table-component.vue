<template>
  <loader v-if="load"/>
  <div v-if="user && !load" class="table">
    <div v-for="status in statuses"
         :key="status.id"
         @drop="onDrop($event, status.id)"
         class="droppable"
         @dragover.prevent
         @dragenter.prevent>
      <h4>{{ status.status_name }}</h4>
      <div v-for="post in posts.filter(x => x.status_id === status.id)"
           @dragstart="onDragStart($event, post)"
           class="draggable"
           id="draggble"
           :key="post.id"
           draggable="true">
        <h5 class="btn-group">{{ post.title }}</h5>
      </div>
    </div>
  </div>
  <div v-else-if="!user && !load">
    <h1>Вы не авторизированны</h1>
  </div>
</template>

<script>

import {ref, defineComponent, onMounted} from "vue";
import axios from 'axios'
import {useRoute} from "vue-router";
import loader from './loader-component'

export default defineComponent({
  name: 'table-component',
  components:{
    loader
  },
  setup() {
    const posts = ref(),
        statuses = ref(),
        user = ref(),
        route = useRoute(),
        roomId = route.params.id,
        load = ref(true);

    onMounted(async () => {
      await axios.get('/api/user',{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(res=>{
        console.log(res.data)
        user.value = res.data[0];
        load.value =  false
      }).catch(err=>{
        console.log(err)
        load.value = false
      });

      const res = await axios.post("api/tasks/"+roomId),
          res1 = await axios.get('/api/all-status');
      //
      posts.value = res.data[0];
      statuses.value = res1.data[0];
    });

    function onDragStart(e, item) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('itemId', item.id.toString())
    }

    function onDrop(e, statusId) {
      const itemId = parseInt(e.dataTransfer.getData('itemId'))
      console.log(posts);
      posts.value = posts.value.map(x => {
        if (x.id === itemId) {
          x.status_id = statusId
          axios.post('/api/change-status', {
            statusId: statusId,
            id: x.id
          }).then(res => {
            console.log(res.data.message);
          });
        }
        return x
      })
    }

    return {
      statuses,
      posts,
      user,
      onDragStart,
      onDrop,
      load
    }
  }
})

</script>

<style scoped>

.table{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
}

.droppable {
  padding: 15px;
  border-radius: 10px;
  background: #2c3e50;
  margin-bottom: 10px;
  min-height: 300px;
}

.droppable h4 {
  color: white;
}

.draggable {
  background: white;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-top: 10px;
}

.draggable h5 {
  margin: 0;
}
</style>