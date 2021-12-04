<template>
  <v-card
    max-height="200"
    class="mb-3"
    outlined
  >
    <v-layout>
      <div class="d-flex flex-column">
        <v-card-title> {{product.name}} </v-card-title>
        <v-card-subtitle> {{product.code}} </v-card-subtitle>
        <v-card-subtitle> {{product.category.categoryName}} </v-card-subtitle>
        <div class=" ml-5 d-flex flex-column-reverse">
          <span class="py-5"> Цена: {{product.price}} Р.</span>
        </div>
      </div>
      <v-spacer></v-spacer>
      <v-layout 
        class="pr-5"
        justify-end 
        align-center
      >
        <v-btn
          color="secondary"
          @click="addProduct"
        >
          В корзину
        </v-btn>
      </v-layout>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    product: Object,
  },

  data: () => ({
    
  }),

  methods: {
    addProduct() {
      this.$store.commit('catalog/ADD_PRODUCT', {
        ...this.product,
        count: 1,
      });
    }
  }
}
</script>