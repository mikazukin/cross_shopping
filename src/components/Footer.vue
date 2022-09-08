<template>
  <div id="footer">
    <a href="#" class="logo_button">
      <img class="button_image" src="../assets/search_image.png" alt="お店を探す">
      お店を探す
    </a>
    <router-link class="logo_button" to="/scan">
      <img class="button_image" src="../assets/camera.png" alt="スキャン">
      スキャン
    </router-link>
    <a href="#" class="logo_button">
      <img class="button_image" src="../assets/history_image.png" alt="購入履歴">
      購入履歴
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    scan() {
      alert('yeah')
    }
  }
}
</script>

<style scoped>
#footer {
  position: fixed;
  background: pink;
  width: 100%;
  left: 0;
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
</style>