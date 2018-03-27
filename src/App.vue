<template>
  <div id="app" class="container">
    <my-product></my-product>
  </div>
</template>

<script>

import Product from './components/Product'

export default {
  name: 'App',
  components: {
    'my-product': Product
  }
}
</script>

<style>
body {
  overflow-x: hidden;
  font-size: 14px;
  font-family: 'Source Sans Pro', sans-serif;
}
</style>
