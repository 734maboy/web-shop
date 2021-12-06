<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="dateTo"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
  <template v-slot:activator="{ on, attrs }">
    <v-text-field
      width="300"
      v-model="dateTo"
      label="Дата доставки"
      prepend-icon="mdi-calendar"
      readonly
      v-bind="attrs"
      v-on="on"
    ></v-text-field>
  </template>
  <v-date-picker
    v-model="dateTo"
    :min="today"
    no-title
    scrollable
  >
    <v-spacer></v-spacer>
      <v-btn
        text
        color="primary"
        @click="menu = false"
      >
        Отменить
      </v-btn>
      <v-btn
        text
        color="primary"
        @click="saveDate(dateTo)"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    dateTo: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
  }),
  
  methods: {
    saveDate(date) {
      this.$emit('getActDate', date);
      this.$refs.menu.save(date);
    },
  },
}
</script>

<style scoped>
  .v-text-field {
    width: 250px;
  }
</style>