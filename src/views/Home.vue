<template>
  
  <v-layout 
    style="padding: 0; margin: 0;">
    <v-img
      :aspect-ratio="2.1"
      src="../assets/bg.jpg"
      gradient="to top right, rgba(0,0,0, .5), rgba(0,0,0,.7)"
    >
      <v-layout justify-center align-center fill-height>
        <h1 class="white--text"> Интернет-магазин WEBSHOP </h1>
      </v-layout>
    </v-img>
  </v-layout>
</template>

<script>
  export default {
    name: 'Home',
  }
</script>

<style scoped>
  .v-container {
    margin: 0 !important;
    padding: 0 !important;
  }
</style>
