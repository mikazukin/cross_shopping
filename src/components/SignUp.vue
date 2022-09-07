<template>
  <form class="sign_up_form">
    <div>
      <p>メールアドレス</p>
      <input type="email" name="mail">
    </div>
    <div>
      <p>パスワード</p>
      <input type="password" name="password">
    </div>
    <button class="submit_button" type="submit">登録</button>
  </form>
</template>

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