<template>
  <v-card>
    <v-card-text>
      <div 
        v-for="order in userOrders"
        :key="order.orderNumber"
      >
        <span>{{order.id}}</span>
        <span>{{order.orderDate}}</span>
        <span>{{order.shipmentDate}}</span>
        <span>{{order.orderNumber}}</span>
        <span>{{order.status}}</span>
      </div>
    </v-card-text>
  </v-card>
</template>


<script>
export default {
  data: () => ({

  }),

  computed: {
    userOrders() {
      return this.$store.getters['user/getOrders'];
    }
  }
}
</script>