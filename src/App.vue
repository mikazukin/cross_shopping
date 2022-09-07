<template>
  <div id="app">

    <video id="js-video" class="reader-video" autoplay playsinline></video>
    <button @click="scanQR">カメラ</button>
    <router-view></router-view>

  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  methods: {
    scanQR() {
      const video  = document.querySelector('#js-video')

      if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
  alert("Let's get this party started")
}
navigator.mediaDevices.getUserMedia({video: true})
      navigator.mediaDevices
          .getUserMedia({
              audio: false,
              video: {
                  // facingMode: {
                  //     exact: 'environment'
                  // }
              }
          })
          .then(function(stream) {
              video.srcObject = stream
              video.onloadedmetadata = function() {
                  video.play()
              }
          })
          .catch(function(err) {
              // alert('Error!!')
              console.log(err)
          })
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

</style>
