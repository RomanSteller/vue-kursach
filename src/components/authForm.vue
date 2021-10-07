<template>
  <div>

    <form action="" v-if="!toogleForm">

      <p>Регистрация</p>
      <div class="form-group">
        <label for="login">Логин</label>
        <input type="text" id="login" name="login">
      </div>
      <div class="form-group">
        <label for="name">ФИО</label>
        <input type="text" id="name" name="name" >
      </div>
      <div class="form-group">
        <label for="email">Электронная почта</label>
        <input type="text" id="email" name="email">

      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input type="password" id="password" name="password">
      </div>
      <div class="form-group">
        <label for="password_repeat">Повтор пароля</label>
        <input type="password" id="password_repeat" name="confirmed_password">
      </div>
      <input type="submit">
      <a href="" @click.prevent="switchForm">Я зарегестрирован</a>
    </form>

    <form action="" v-if="toogleForm">
      <p>Авторизация</p>
      <div class="form-group">
        <label for="login">Логин</label>
        <input type="text" id="auth_login">
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input type="password" id="auth_password" >
      </div>
      <input type="submit">
      <a href="" @click.prevent="switchForm">У меня нет аккаунта</a>
    </form>
  </div>

</template>

<script>

export default {
  name: "authForm",
  data(){
    return{
      toogleForm:true,
      failLogin:false,
      failPassword:false,
      failSecondPassword:false,
      failName:false,
      failEmail:false,
      successRegister:false,
      authFail:false,
      failAuthMessage:"",
      regForm:{
        login:"",
        name:"",
        password:"",
        confirmed_password:"",
        email:""
      },
      authForm:{
        login:'',
        password:''
      },
      successRegisterText:"",
      errorExists:false,
      errorText:"",
      failLoginMessage:"",
      failPasswordMessage:"",
      failSecondPasswordMessage:"",
      failEmailMessage:"",
      failNameMessage:"",
    }
  },
  methods:{
    switchForm(){
      this.toogleForm = !this.toogleForm
    },
  }
}
</script>
<style scoped>
form{
  width: 400px;
  margin: 40px auto;
  background-color: #f7f7f7;
  box-shadow: 0 2px 4px 0 darkgray;
  padding: 50px 30px;
}
.form-group{
  display: flex;
  flex-direction: column;
}
.form-group input{
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0;
  border: 1px solid gray;
  outline: none;
  padding:5px 0 5px 5px;
}
a{
  color: #1a202c;
}
input[type='submit']{
  padding: 6px 20px;
  background: #303b44;
  color:white;
  border:none;
}
p{
  padding-bottom: 20px;
  font-size: 25px;
  text-align: center;
}
span{
  margin-bottom: 20px;
}
</style>