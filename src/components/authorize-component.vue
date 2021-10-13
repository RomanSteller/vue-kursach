<template>
  <form action="" @submit.prevent style="padding-top: 30px">
    <div class="alert alert-danger" v-for="error in errors" :key="error">
      <strong>Danger!</strong> {{ error }}
    </div>
    <p style="font-size: 20px">Авторизация</p>
    <div class="form-group">
      <label for="login">Логин</label>
      <input type="text" id="login" v-model="authForm.login">
    </div>
    <div class="form-group">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="authForm.password">
    </div>
    <div class="form-group">
      <a @click="checkAuthError" style="color:white; margin-bottom: 30px">Авторизация</a>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "authorize-component",
  data(){
    return{
      errors:[],
      authForm: {
        login: '',
        password: ''
      }
    }
  },
  methods:{
    checkAuthError(){
      this.errors.length = 0;

      if (this.authForm.login.trim().length === 0){
        this.errors.push('Поле с логином не должно быть пустым')
      }
      if (this.authForm.password.trim().length === 0){
        this.errors.push('Поле с паролем не должно быть пустым')
      }

      if(this.errors.length === 0){
        this.authUser()
      }

    },
    async authUser(){
      const res = await axios.post('api/sanctum/token',this.authForm)

      localStorage.setItem('token',res.data.token);
      await this.$router.push('/');
    }
  }
}
</script>

<style scoped>


.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.form-group label {
  font-size: 15px;
  font-weight: bold;

}

form {
  font-family: 'Noto Sans', sans-serif;
  margin: 30px auto;
  max-width: 400px;
  background: #ffffff;
  color: #2c3e50;
  font-weight: bolder;
  border-radius: 10px;
  padding: 10px 30px;
}

.form-group input, button, a {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px 5px;
  border-radius: 0;
  border: 1px solid gainsboro;
}

.form-group input {
  border-radius: 0;
  border: 1px solid gainsboro;
  outline: none;
  font-size: 20px;
}

.form-group a {
  font-size: 16px;
  background: #0086b3;
  color: white;
  border-radius: 5px;
  font-weight: lighter;
  border: none;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
}
</style>