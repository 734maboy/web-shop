<template>
  <v-layout 
    justify-space-around
    row
  >
    <v-card v-if="!orders || orders.length < 1"
      flat
    >
      <v-card-title>
        У вас нет заказов :(
      </v-card-title>
    </v-card>
    <v-layout column
      style="max-height: 85vh;"
      class="mx-5 px-5 py-2 my-2 overflow-auto outlined product-list-border"
      align-center
    >
      <template
        v-for="order in orders"
      >
        <order 
          v-if="order.orderStatus.name == status || status == 'Все'"
          :key="order.orderNumber"
          :order="order"
          class="my-2"
          outlined
        />
      </template>
    </v-layout>
    <v-card class="mx-5 mt-2"
      height="300"
      outlined
    >
      <v-card-title>
        Статусы
      </v-card-title>
      <v-card-text>
        <v-radio-group v-model="status">
          <v-radio v-for="st in statuses"
            :key="st"
            :label="st"
            :value="st"
          >
          </v-radio>
        </v-radio-group>
      </v-card-text>
    </v-card>
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
    status: 'Все',
    statuses: ['Все', 'Новый', 'Выполняется', 'Выполнен'],
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

    filteredOrders() {
      if (this.status == 'Все') return this.orders;
      return this.orders.map(item => item.orderStatus.name == this.status);
    },
  }
}
</script>