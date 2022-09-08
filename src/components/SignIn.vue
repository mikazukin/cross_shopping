<template>
  <form class="sign_in_form">
    <div>
      <p>メールアドレス</p>
      <input type="email" name="mail">
    </div>
    <div>
      <p>パスワード</p>
      <input type="password" name="password">
    </div>
    <button class="submit_button" type="submit">ログイン</button>
  </form>
</template>

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