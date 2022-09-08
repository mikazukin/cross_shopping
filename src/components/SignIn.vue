<template>
  <div class="sign_in_form">
    <img src="../assets/logo.jpeg" width="190px" height="190px">
    <div>
      <p>メールアドレス</p>
      <input type="email" v-model="email">
    </div>
    <div>
      <p>パスワード</p>
      <input type="password" v-model="password">
    </div>
    <button class="submit_button" type="submit" @click="signIn">ログイン</button>
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
    signIn() {
      this.$store.dispatch('signIn', {
        email: this.email,
        password: this.password,
      })
      this.email = ''
      this.password = ''
    },
  }
}
</script>

<style>
  .sign_in_form {
    width: 70%;
    margin: auto;
  }

  .sign_in_form input {
    width: 100%;
    padding: 10px;
  }

  .sign_in_form p {
    text-align: left;
  }

  .submit_button {
    width: 150px;
    height: 30px;
    margin-top: 30px;
  }
</style>