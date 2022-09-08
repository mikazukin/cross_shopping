<template>
  <div class="sign_up_form">
    <img src="../assets/logo.jpeg" width="190px" height="190px">
    <div>
      <p>メールアドレス</p>
      <input type="email" v-model="email">
    </div>
    <div>
      <p>パスワード(6文字以上)</p>
      <input type="password" v-model="password">
    </div>
    <button class="submit_button" type="submit" @click="signUp">登録</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    signUp() {
      this.$store.dispatch('signUp', {
        email: this.email,
        password: this.password,
      })
    },
  }
}
</script>

<style>
  .sign_up_form {
    width: 70%;
    margin: auto;
  }

  .sign_up_form input {
    width: 100%;
    padding: 10px;
  }

  .sign_up_form p {
    text-align: left;
  }

  .submit_button {
    width: 150px;
    height: 30px;
    margin-top: 30px;
  }
</style>