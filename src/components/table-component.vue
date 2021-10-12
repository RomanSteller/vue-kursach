<template>
  <div v-if="user" class="table">
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
           :key="post.id"
           draggable="true">
        <h5>{{ post.title }}</h5>
      </div>
    </div>
  </div>
  <div v-else>
    <h1>Вы не авторизированны</h1>
  </div>

</template>

<script>

import {ref, defineComponent, onMounted} from "vue";
import axios from 'axios'

export default defineComponent({
  name: 'table-component',
  components:{
  },
  setup() {
    const posts = ref(),
        statuses = ref(),
        user = ref()


    onMounted(async () => {
      const getToken = await axios.get('/api/user',{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      const res = await axios.get("/api/all-tasks"),
          res1 = await axios.get('/api/all-status');
      posts.value = res.data[0];
      statuses.value = res1.data[0];
      user.value = getToken.data[0];
    });

    function onDragStart(e, item) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('itemId', item.id.toString())
    }

    function onDrop(e, categoryId) {
      const itemId = parseInt(e.dataTransfer.getData('itemId'))
      console.log(posts);
      posts.value = posts.value.map(x => {
        if (x.id === itemId) {
          x.status_id = categoryId
          axios.post('/api/change-status', {
            statusId: categoryId,
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
      onDrop
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
  height: 300px;

}

.droppable h4 {
  color: white;
}

.draggable {
  background: white;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
}

.draggable h5 {
  margin: 0;
}
</style>