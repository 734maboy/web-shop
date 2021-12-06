<template>
  <v-card
    style="min-height: 85vh; max-height: 85vh; overflow: auto;"
    min-width="300"
    class="mt-2"
    outlined
  >
    <v-card-title class="mb-5 mx-2">
      <v-layout row align-center>
        <span> Корзина </span>
        <v-spacer/>
        <v-divider 
          class="mx-2"
          vertical
        />
        <v-spacer></v-spacer>
        <v-row justify="center">
          <v-dialog
            v-model="dialog"
            max-width="700px"
            scrollable
            persistent
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :disabled="cartIsEmpty"
                v-bind="attrs"
                v-on="on"
                color="success"
                small
              > Заказать</v-btn>
            </template>
            <v-card min-width="700px">
              <v-card-title>Ваш заказ</v-card-title>
              <v-divider></v-divider>
              <v-card-text style="height: 500px; min-width: 700px;">
                <v-layout column>
                  <v-card
                    class="my-2"
                    v-for="product in products"
                    :key="product.id + 'c'">
                    <v-card-title> {{product.name}} </v-card-title>
                    <v-card-subtitle> Цена:  {{product.price}} Р. (за шт.) </v-card-subtitle>
                    <v-card-text> Кол-во: {{product.count}} </v-card-text>
                  </v-card>
                </v-layout>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn
                  color="error"
                  text
                  @click="dialog = false"
                >
                  Закрыть
                </v-btn>
                <v-btn
                  color="success"
                  text
                  @click="createOrder"
                >
                  Оформить заказ
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-layout>
    </v-card-title>
    <v-card-subtitle>
      {{cartMessage}}
    </v-card-subtitle>
    <v-card-text v-if="products.length > 0">
      На сумму {{totalPrice}}
    </v-card-text>
    <v-layout
      fill-height
      column
    >
      <v-card
        v-for="product in products"
        :key="product.id + 'c'">
        <v-card-title> {{product.name}} </v-card-title>
        <v-card-subtitle> {{product.price}} Р. </v-card-subtitle>
        <v-card-text> {{product.count}} </v-card-text>
        <v-card-actions>
          <v-btn
            @click="deleteProductInCart(product.id)"
          >
            Удалить (1)
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-card>
</template>

<script>
import Product from '../../components/helpers/Product.vue';

export default {

  data: () => ({
    message: 'Корзина пуста',
    dialogm1: '',
    dialog: false,
  }),

  components: {
    Product,
  },

  methods: {
    deleteProductInCart(id) {
      this.$store.commit('catalog/REMOVE_PRODUCT', id);
    },

    createOrder() {
      this.$store.dispatch('customer/createOrder');
      this.dialog = false;
      this.$store.dispatch('catalog/clearCart');
    },
  },

  computed: {
    products() {
      return this.$store.getters['catalog/getCart'];
    },
    cartMessage() {
      return this.products.length <= 0 ? 'Корзина пуста' : ' Товаров в корзине: ' + this.products.length;
    },
    cartIsEmpty() {
      return this.products.length > 0 ? false : true;
    },
    totalPrice() {
      return this.products.reduce((prev, item) => prev + (item.price * item.count), 0);
    },
  }

}
</script>