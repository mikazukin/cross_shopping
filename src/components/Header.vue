<template>
  <div id="header">
    <div id="profile_wrap">
      <img class="button_image" src="../assets/profile_image.png" alt="プロフィール画像">
    </div>
  </div>
</template>

<style scoped>
#header {
  position: fixed;
  background: pink;
  width: 100%;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: row-reverse;
}

.button_image {
  width: 40px;
}

#profile_image {
  height: 30px;
}
</style>