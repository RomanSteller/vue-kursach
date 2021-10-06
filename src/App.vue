<template>
  <div>
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

</template>

<script>

import {ref,defineComponent,onMounted} from "vue";
import axios from 'axios'


export default defineComponent({
  name: 'App',

  components: {},

   setup() {
     const posts = ref([]),
           statuses = ref([]);

     onMounted(async () =>{
        const res = await axios.get("http://127.0.0.1:8000/api/all-tasks"),
              res1 = await axios.get('http://127.0.0.1:8000/api/all-status');
        posts.value = res.data;
        statuses.value = res1.data;

     });
     // async function fetchPosts() {
     //   await axios.get('http://127.0.0.1:8000/api/all-tasks')
     //       .then(res => {
     //         posts.value = res.data
     //       });
     //   return posts
     // }
     //
     // async function fetchStatus() {
     //     await axios.get('http://127.0.0.1:8000/api/all-status')
     //       .then(res => {
     //         statuses.value = res.data
     //
     //       })
     //   return {statuses}
     // }

     function onDragStart(e, item) {
       e.dataTransfer.dropEffect = 'move'
       e.dataTransfer.effectAllowed = 'move'
       e.dataTransfer.setData('itemId', item.id.toString())
     }

     function onDrop(e, categoryId) {
       const itemId = parseInt(e.dataTransfer.getData('itemId'))

       posts.value = posts.value.map(x => {
         if (x.id === itemId)
           x.status_id = categoryId
         return x
       })
     }

     return {
       statuses,
       posts,
       onDragStart,
       onDrop
     }
   }
})

</script>

<style>
.droppable {
  padding: 15px;
  border-radius: 5px;
  background: #2c3e50;
  margin-bottom: 10px;
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


<!-- Тот же самый код только объекты уже определены  -->


<!--<template>-->
<!--  <div>-->
<!--    <div v-for="category in categories"-->
<!--         :key="category.id"-->
<!--         @drop="onDrop($event, category.id)"-->
<!--         class="droppable"-->
<!--         @dragover.prevent-->
<!--         @dragenter.prevent>-->
<!--      <h4>{{ category.title }}</h4>-->
<!--      <div v-for="item in items.filter(x => x.categoryId === category.id)"-->
<!--           @dragstart="onDragStart($event, item)"-->
<!--           :key="item.id"-->
<!--           class="draggable"-->
<!--           draggable="true">-->
<!--        <h5>{{ item.title }}</h5>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { ref } from 'vue'-->
<!--export default {-->
<!--  name: 'App',-->
<!--  setup() {-->
<!--    const items = ref([-->
<!--      {-->
<!--        id: 0,-->
<!--        title: 'Audi',-->
<!--        categoryId: 0-->
<!--      },-->
<!--      {-->
<!--        id: 1,-->
<!--        title: 'BMW',-->
<!--        categoryId: 0-->
<!--      },-->
<!--      {-->
<!--        id: 2,-->
<!--        title: 'Cat',-->
<!--        categoryId: 1-->
<!--      },-->
<!--    ])-->
<!--    console.log(items);-->
<!--    const categories = ref([-->
<!--      {-->
<!--        id: 0,-->
<!--        title: 'Cars'-->
<!--      },-->
<!--      {-->
<!--        id: 1,-->
<!--        title: 'Animals'-->
<!--      }-->
<!--    ])-->
<!--    function onDragStart(e, item) {-->
<!--      e.dataTransfer.dropEffect = 'move'-->
<!--      e.dataTransfer.effectAllowed = 'move'-->
<!--      e.dataTransfer.setData('itemId', item.id.toString())-->
<!--    }-->
<!--    function onDrop(e, categoryId) {-->
<!--      const itemId = parseInt(e.dataTransfer.getData('itemId'))-->
<!--      items.value = items.value.map(x => {-->
<!--        if (x.id === itemId)-->
<!--          x.categoryId = categoryId-->
<!--        return x-->
<!--      })-->
<!--    }-->
<!--    return {-->
<!--      items,-->
<!--      categories,-->
<!--      onDragStart,-->
<!--      onDrop-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.droppable {-->
<!--  padding: 15px;-->
<!--  border-radius: 5px;-->
<!--  background: #2c3e50;-->
<!--  margin-bottom: 10px;-->
<!--}-->
<!--.droppable h4 {-->
<!--  color: white;-->
<!--}-->
<!--.draggable {-->
<!--  background: white;-->
<!--  padding: 5px;-->
<!--  border-radius: 5px;-->
<!--  margin-bottom: 5px;-->
<!--}-->
<!--.draggable h5 {-->
<!--  margin: 0;-->
<!--}-->
<!--</style>-->