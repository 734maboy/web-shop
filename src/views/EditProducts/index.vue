<template>
  <v-layout>
    <data-table
      :headers="headers"
      :title="'Товары'"
      :items="products"
      :editProperties="['id', 'name', 'price', 'code', 'category']"
      @resetFields="resetFields"
      @fillData="fillData"
      @saveItem="save"
      @addItem="addNewProduct"
      @deleteItem="deleteItem"
    >
      <template #fields>
        <v-text-field
          v-model="editedItem.name"
          label="Name"
        ></v-text-field>
        <v-text-field
          v-model="editedItem.price"
          label="Price"
        ></v-text-field>
        <v-select
          v-model="editedItem.category"
          :items="categories"
        >
        </v-select>           
      </template>
    </data-table>
  </v-layout>
</template>

<script>
import DataTable from '@/components/helpers/DataTable.vue';


export default {
  components: {
    DataTable,
  },

  data: () => ({
    dialog: false,
    headers: [
      { text: 'id', value: 'id' },
      { text: 'name', value: 'name' },
      { text: 'price', value: 'price' },
      { text: 'code', value: 'code' },
      { text: 'category', value: 'category' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedItem: {
        id: '',
        name: '',
        price: 0,
        code: 0,
        category: '',
    },
    defaultItem: {
        id: '',
        name: '',
        price: 0,
        code: 0,
        category: '',
    },
  }),

  methods: {
    fillData(item) {
       (item);
      this.editedItem = item;
    },

    save() {
      this.$store.dispatch('catalog/updateProduct', this.editedItem);
    },

    deleteItem(item) {
      this.$store.dispatch('catalog/removeProductFromList', item);
    },

    addNewProduct(product) {
      this.$store.dispatch('catalog/createNewProduct', this.editedItem);
    },

    resetFields() {
      this.editedItem = Object.assign({}, this.defaultItem);
    }
  },

  computed: {
    categories() {
      return this.$store.getters['catalog/getCategoriesList'].map( item => item.categoryName);
    },
    products() {
        return (this.$store.getters['catalog/getProductsList']).map( item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          code: item.code,
          category: item.category.categoryName,
        }));
      }
  },
}
</script>