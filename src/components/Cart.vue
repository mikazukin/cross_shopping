<template>
  <div>
    <Header></Header>

    <div class="cart_title">買い物カゴ</div>
    <div class="total_price_wrap">
      <p>小計</p><p>{{ totalPrice }}円</p>
    </div>

    <div class="product-list_wrap">
      <template v-if="selectedProductList.length > 0">
        <div class="product_list" v-for="(product, index) in selectedProductList" :key="index">
          <!-- 汚いけどやむなし -->
          <template v-if="Number(product.id) === 1">
            <img class="product_image" src="../assets/image_1.png" alt="商品画像">
          </template>
          <template v-else-if="Number(product.id) === 2">
            <img class="product_image" src="../assets/image_2.png" alt="商品画像">
          </template>
          <template v-else>
            <img class="product_image" src="../assets/image_1.png" alt="商品画像">
          </template>

          <div class="right_wrap">
            <div class="right_inner_wrap">
              <p>{{ product.name }}</p>
              <p>数量：1</p>
            </div>
            <div class="right_inner_wrap">
              <p>価格：{{ product.price }}円</p>
              <button class="delete_button" @click="deleteCart(product.document_name, product.id)">削除</button>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        現在カゴは空です。
      </template>
    </div>

    <div style="margin-top: 40px; height: 200px;">
      <button @click="whichTab = 'id'">ID入力</button>
      <button @click="whichTab = 'qr'">QR読み取り</button>
      <template v-if="whichTab == 'id'">
        <div>
          服のID：<input type="number" v-model="id">
          <button type="submit" @click="addToCart">カートに追加</button>
        </div>
      </template>
      <template v-if="whichTab == 'qr'">
        <h1>QR</h1>
        <button @click="scan">クリック</button>
        <div id="wrapper">
          <div id="msg">Unable to access video stream.</div>
          <canvas id="canvas"></canvas>
        </div>
      </template>
    </div>
    

    <Footer></Footer>
  </div>
</template>

<script>
import axios from 'axios'
import Header from './Header.vue';
import Footer from './Footer.vue';
import { productList } from '../../const'
import jsQR from "jsqr";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      whichTab: 'id',
      id: null,
      totalPrice: 0,
      productList: productList,
      selectedProductListId: [],
      selectedProductList: [],
    }
  },
  computed: {
    idToken() {
      return this.$store.getters.idToken
    }
  },
  created() {
    axios.get('https://firestore.googleapis.com/v1/projects/cross-shopping-backend/databases/(default)/documents/carts')
    .then(
      res => {
      // cloud firestoreのドキュメントパスを取得
      const document_id_list = res.data.documents.map(el => el.name)
      // カートに追加した商品のIDを取得
      this.selectedProductListId = res.data.documents.map(el => Number(el.fields.product_id.integerValue))
      // IDに紐づいた商品の情報を取ってくる
      this.selectedProductListId.forEach((el, index) => {
        let productInfo = productList.find(({id}) => id === Number(el))
        Object.assign(productInfo, {document_name: document_id_list[index]})
        this.selectedProductList.push(productInfo)
        this.totalPrice += productInfo.price
      })
    }
    )
  },
  methods: {
    addToCart() {
      if(productList.find(({id}) => id === Number(this.id)) == undefined) {
        alert('入力したIDに対応する商品はありません。')
        return false
      }
      else if(this.selectedProductListId.includes(Number(this.id))) {
        alert('すでに同じ商品がカートに入っています')
        return false
      }
      axios.post('https://firestore.googleapis.com/v1/projects/cross-shopping-backend/databases/(default)/documents/carts',
        {
          fields: {
            product_id: {
              integerValue: this.id
            }
          }
        }
      )
      .then(
        res => {
          console.log(res.data)
          const new_id = Number(res.data.fields.product_id.integerValue)
          const productInfo = productList.find(({id}) => id === new_id)
          Object.assign(productInfo, {document_name: res.data.name})
          this.selectedProductListId.push(new_id)
          this.selectedProductList.push(productInfo)
          this.totalPrice += productInfo.price
        }
      )
      .catch(err => {
        console.log(err)
      })
    },
    deleteCart(document_name, product_id) {
      console.log(document_name)
      axios.delete(`https://firestore.googleapis.com/v1/${document_name}`)
      .then(
        this.selectedProductList.forEach((el, index) => {
          if(el.document_name == document_name) {
            this.totalPrice -= el.price
            this.selectedProductList.splice(index, 1)
            return false
          }
        }),

        this.selectedProductListId.forEach((id, index) => {
          if(Number(id) === Number(product_id)) {
            console.log(this.selectedProductListId.splice(index, 1))
            return false
          }
        }),
      )
    },
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

<style scoped>
.cart_title {
  padding: 10px 0;
}

.total_price_wrap {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}

.product_list {
  display: flex;
  border-bottom: 1px solid black;
  padding: 20px;
}

.product_image {
  width: 120px;
}

.right_wrap {
  width: 100%;
}

.right_inner_wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.delete_button {
  height: 30px;
}
</style>