<template>
  <div id="app">
    <Header></Header>

    <Cart></Cart>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Cart from './components/Cart.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Cart,
},
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
