<template>
  <div>
    <h1>QR</h1>
    <button @click="scan">クリック</button>
    <div id="wrapper">
      <div id="msg">Unable to access video stream.</div>
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import jsQR from "jsqr";
import axios from 'axios'

export default {
  methods: {
    scan() {
      let video  = document.createElement("video");
      let canvas = document.getElementById("canvas");
      let ctx    = canvas.getContext("2d");
      let msg    = document.getElementById("msg");

      const userMedia = {video: {facingMode: "environment"}};
      navigator.mediaDevices.getUserMedia(userMedia)
      .then((stream)=>{
        video.srcObject = stream;
        video.setAttribute("playsinline", true);
        video.play();
        startTick();
      })
      .catch((err) => {alert(err)});

      function startTick(){
        msg.innerText = "Loading video...";
        if(video.readyState === video.HAVE_ENOUGH_DATA){
          canvas.height = video.videoHeight;
          canvas.width = video.videoWidth;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
          let code = jsQR(img.data, img.width, img.height, {inversionAttempts: "dontInvert"});
          if(code){
            drawRect(code.location);// Rect
            msg.innerText = code.data;// Data

            axios.post('https://firestore.googleapis.com/v1/projects/cross-shopping-backend/databases/(default)/documents/carts',
              {
                fields: {
                  product_id: {
                    integerValue: code.data
                  }
                }
              }
            )
            .then(window.location = '/')
            .catch(err => console.log(err))
          }else{
            msg.innerText = "Detecting QR-Code...";
          }
        }
        setTimeout(startTick, 250);
      }

      function drawRect(location){
        drawLine(location.topLeftCorner,     location.topRightCorner);
        drawLine(location.topRightCorner,    location.bottomRightCorner);
        drawLine(location.bottomRightCorner, location.bottomLeftCorner);
        drawLine(location.bottomLeftCorner,  location.topLeftCorner);
      }

      function drawLine(begin, end){
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#FF3B58";
        ctx.beginPath();
        ctx.moveTo(begin.x, begin.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }
    },
  }
}
</script>