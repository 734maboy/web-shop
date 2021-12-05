<template>
  <v-layout column>
    <order 
      v-for="order in orders"
      :key="order.orderNumber"
      :order="order"
      max-width="400"
      class="my-2"
      outlined
    />
  </v-layout>
</template>


<script>
import Order from './Order.vue';

export default {
  data: () => ({
    minDate: new Date().toISOString().substr(0, 10),
		dateFrom: new Date().toISOString().substr(0, 10),
		dateTo: new Date().toISOString().substr(0, 10),
		timeFrom: '00:00',
		timeTo: '00:00',
    menu: false,
  }),

  components: {
    Order,
  },

  methods: {
  },

  computed: {
    orders() {
      return this.$store.getters['customer/getOrders'] || this.$store.getters['manager/getAllOrders'];
    },
  }
}
</script>