<template>
  <form action="">
    <div class="alert alert-danger" v-for="error in errors" :key="error">
      <strong>Danger!</strong> {{ error }}
    </div>
    <p style="font-size: 20px;padding-top: 30px">Регистрация</p>
    <div class="form-group">
      <label for="login">Логин</label>
      <input type="text" id="login" name="login" v-model="regForm.login">
    </div>
    <div class="form-group">
      <label for="name">ФИО</label>
      <input type="text" id="name" name="name" v-model="regForm.name">
    </div>
    <div class="form-group">
      <label for="email">Электронная почта</label>
      <input type="text" id="email" name="email" v-model="regForm.email">
    </div>
    <div class="form-group">
      <label for="password">Пароль</label>
      <input type="password" id="password" name="password" v-model="regForm.password">
    </div>
    <div class="form-group">
      <label for="password_repeat">Повтор пароля</label>
      <input type="password" id="password_repeat" name="confirmed_password" v-model="regForm.confirm">
    </div>
    <div class="form-group" style="margin-bottom: 30px">
      <a @click.prevent="checkRegError" style="color: white">Зарегестрироваться</a>
    </div>

  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "register-component",
  data() {
    return {
      errors: [],
      regForm: {
        login: '',
        name: '',
        password: '',
        confirm: '',
        email: ''
      },
    }
  },
  methods: {
    checkRegError() {
      this.errors.length = 0;
      let emailPatter = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          cyrillicPattern = /[А-я-\s]/

      if (this.regForm.email.trim().length > 0) {
        if (!emailPatter.test(this.regForm.email)) {
          this.errors.push('Почта не является валлидной');
        }
      } else {
        this.errors.push('Поле с электронной почтой не должно быть пустым')
      }

      if (this.regForm.name.trim().length > 0) {
        if (!cyrillicPattern.test(this.regForm.name)) {
          this.errors.push('ФИО должно содержать только кириллистические символы')
        }
      } else {
        this.errors.push('Поле с ФИО не должно быть пустым')
      }

      if (this.regForm.login.trim().length === 0) {
        this.errors.push('Поле с логином не должно быть пустым')
      }

      if (this.regForm.password.length === 0 && this.regForm.confirm.length === 0) {
        this.errors.push('Поле с паролями не должны быть пустыми')
      }

      if (this.regForm.password !== this.regForm.confirm) {
        this.errors.push('Пароли должны совпадать')
      }

      if (this.errors.length === 0) {
        this.createUser()
      }

      console.log(this.errors)

    },
    createUser() {
      axios.post('api/sanctum/register', this.regForm)
          .then(res => {
            console.log(res.data)
          })
      this.$router.push('/auth');
    }
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

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