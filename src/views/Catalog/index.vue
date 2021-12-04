<template>
  <v-layout 
    
    class="px-4"
  >
    <categories/>
    <v-layout
      style="max-height: 85vh;"
      class="mx-5 px-4 py-2 my-2 overflow-auto outlined product-list-border"
      column
      
    >
      <product 
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </v-layout>
    <cart/>
  </v-layout>
</template>

<script>
import Categories from '../../components/helpers/Categories.vue';
import Product from '../../components/helpers/Product.vue';
import Cart from './Cart.vue';

export default {
  components: {
    Categories,
    Product,
    Cart,
  },

  computed: {
    products() {
      return this.$store.getters['catalog/getProductsList'];
    },
  },
  
}
</script>

<style scoped>
  ::-webkit-scrollbar { /* chrome based */
    width: 0px;  /* ширина scrollbar'a */
    background: transparent;  /* опционально */
  }

  .product-list-border {
    border: 1px solid rgb(194, 190, 190);
    border-radius: 3px;
  }
</style>