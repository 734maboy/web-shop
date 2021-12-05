<template>
  <v-card 
      max-width="400"
      class="my-2"
      outlined
    >
      <v-card-text>
        <v-col>
          <v-row>
            <span>Дата заказа: {{order.orderDate}}</span>
          </v-row>  
          <v-row v-if="order.orderStatus.name != 'Новый'">
            <span> Дата поставки: {{order.shipmentDate}} </span>
          </v-row>
          <v-row>
            <span>Номер заказа: {{order.orderNumber}}</span>
          </v-row>  
          <v-row>
            Статус: <b class="green-text"> {{order.orderStatus.name}}</b>
          </v-row>  
          <v-row v-if="order.customer">
            Заказчик: <b> {{order.customer.name}} ({{order.customer.code}})</b>
          </v-row>
        </v-col>
      </v-card-text>
      <v-card-actions>
        <template
          v-if="isManager"
        >
          <template v-if="order.orderStatus.name == 'Новый'">
            <date-picker
              @getActDate="saveDate"
            />
            <time-picker
              @getActTime="saveTime"
            />
            <v-btn
              class="success"
              @click="acceptOrder"
            >
              Подтвердить
            </v-btn>
          </template>
          <v-btn
            v-if="order.orderStatus.name == 'Выполняется'"
            class="primary"
            @click="closeOrder"
          >
            Закрыть заказ
          </v-btn>
        </template>
        <v-btn
          v-if="!isManager && order.orderStatus.name == 'Новый'"
          class="error"
          @click="deleteOrder(order)"
        >
          Удалить
        </v-btn>
      </v-card-actions>
    </v-card>
</template>



<script>
import DatePicker from './DatePicker.vue';
import TimePicker from './TimePicker.vue';

export default {
  data: () => ({
    
		dateTo: new Date().toISOString().substr(0, 10),
		timeTo: '00:00',
  
  }),

  props: {
    order: Object,
  },

  components: {
    DatePicker,
    TimePicker,
  },

  methods: {
    saveDate(date) {
      this.dateTo = date;
    },
    saveTime(time) {
      this.timeTo = time;
    },

    deleteOrder(order) {
      this.$store.dispatch('customer/deleteOrder', order.id);
    },

    acceptOrder() {
      this.$store.dispatch('manager/acceptOrder', {
        orderId: this.order.id,
        shipmentDate: new Date(`${this.dateTo}T${this.timeTo}`).toJSON(),
      });
    },  

    closeOrder() {
      this.$store.dispatch('manager/closeOrder', this.order.id);
    },
  },

  computed: {

    isManager() {
      return this.$store.getters['user/isManager'];
    },
  }
}
</script>