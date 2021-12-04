<template>
    
      <v-card
        style="min-height: 85vh; max-height: 85vh; overflow: auto;"
        class="my-2 px-5"
        max-width="350"
        min-width="240"
        outlined
        
      >
      <v-card-title class="px-0">
        <h4 > Категории </h4>
      </v-card-title>
      <v-checkbox
        v-for="category in categories"
        :key="category.id"
        v-model="selected"
        :label="category.categoryName"
        :value="category.categoryName"
      ></v-checkbox>
    </v-card>
</template>

<script>
export default {
  data: () => ({
    selected: [],
  }),

  computed: {
    categories() {
      return this.$store.getters['catalog/getCategoriesList'];
    },
  },
}
</script>