<template>
  <div id="nav">
    <header>
      <div class="logo">
        <h1>Home</h1>
      </div>
      <div class="navigations">
<!--        <router-link to="/">Home</router-link>-->
        <div v-if="!user">
          <router-link to="/registration">Registration</router-link>
          <router-link to="/auth">Login</router-link>
        </div>
        <div v-else>
          <router-link :to="{name:'rooms',params:{id:user.id}}" >My rooms</router-link>
          <a @click="logout" href="">Logout</a>
        </div>
      </div>
    </header>
    <main>
      <router-view/>
    </main>
  </div>


</template>

<script>
  import axios from "axios";
  export default {
    data(){
      return{
        user:null
      }
    },
    async created() {
      console.log(localStorage.getItem('token'));
      const getToken = await axios.get('/api/user',{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      this.user = getToken.data[0]
    },
    methods:{
      logout(){
        localStorage.removeItem('token')
      }
    }
  }

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');



.navigations{
  display: flex;
  justify-content: space-between;
}

*{
  margin: 0;
  padding: 0;
}

body{
  background-color: #00bfff;
  font-family: 'Noto Sans', sans-serif;
}

router-link{
  margin-right: 30px;
  font-size: 15px;
}
header{
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  background-color: white;
  align-items: center;
}

main{
  padding: 30px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;

}

#nav a{
  margin-right: 10px;
  text-decoration: none;
}

</style>
