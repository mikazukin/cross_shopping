<template>
  <div>
    <div class="cart_title">買い物カゴ</div>
    <div class="total_price_wrap">
      <p>小計</p><p>{{ totalPrice }}円</p>
    </div>

    <div class="product-list_wrap">
      <template v-if="selectedProductList.length > 0">
        <div class="product_list" v-for="(product, index) in selectedProductList" :key="index">
          <img class="product_image" src="../assets/image_1.png" alt="商品画像">
          <div class="right_wrap">
            <div class="right_inner_wrap">
              <p>{{ product.name }}</p>
              <p>数量：{{ product.quantity }}</p>
            </div>
            <div class="right_inner_wrap">
              <p>価格：{{ product.price }}円</p>
              <button>削除</button>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        現在カゴは空です。
      </template>
    </div>
  </div>
</template>

<script>
import { productList } from '../../const'

export default {
  data() {
    return {
      totalPrice: 0,
      productList: productList,
      selectedProductList: [{id: 1, name: "鋭Tシャツ", price: 1200, quantity: 1}],
    }
  },
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
}
</style>