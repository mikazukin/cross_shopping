<template>
  <div id="app">
    <div id="header">
      <div id="account_profile">
        <img class="button_image" src="./assets/profile_image.png" alt="プロフィール画像">
      </div>
    </div>

    <!-- <label for="upload">写真を撮影してアップロードする</label>
    <input id="upload" type="file" name="image" accept="image/*" capture="camera"> -->

    <div class="cart_title">買い物カゴ</div>
    <div class="total_price_wrap">
      <p>小計</p><p>{{ totalPrice }}円</p>
    </div>

    <div id="footer">
      <a href="#" class="logo_button">
        <img class="button_image" src="./assets/search_image.png" alt="お店を探す">
        お店を探す
      </a>
      <div class="logo_button" @click="scan">
        <img class="button_image" src="./assets/camera.png" alt="スキャン">
        スキャン
      </div>
      <a href="#" class="logo_button">
        <img class="button_image" src="./assets/history_image.png" alt="購入履歴">
        購入履歴
      </a>
    </div>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      totalPrice: 0,
    }
  },
  methods: {
    scan() {
      // fetch('../test.py')
      // alert('yeah')
        var constraints = { audio: false, video: { facingMode: "environment" } };

        navigator.mediaDevices.getUserMedia( constraints )
        .then(
          function( stream ) {
            var video = document.querySelector( 'video' );
            video.srcObject = stream;
            video.onloadedmetadata = function() {
              video.play();
            };
          }
        )
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

p {
  margin: 0;
  padding: 10px;
}

a {
  color: black;
  text-decoration: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 46px;
}

#header, #footer {
  position: fixed;
  background: pink;
  width: 100%;
  left: 0;
}

#header {
  top: 0;
}

#footer {
  bottom: 0;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.logo_button {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button_image {
  width: 40px;
}

#profile_image {
  height: 30px;
}

.cart_title {
  padding: 10px 0;
}

.total_price_wrap {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}

</style>
