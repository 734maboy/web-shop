<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="time"
        label="Picker in menu"
        prepend-icon="mdi-clock-time-four-outline"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="menu"
      format="24hr"
      v-model="time"
      full-width
      @click:minute="saveTime(time)"
    ></v-time-picker>
  </v-menu>
</template>

<script>
  export default {
    data () {
      return {
        time: '00:00',
        menu: false,
      }
    },

    methods: {
      saveTime(time) {
        this.$emit('getActTime', time);
        this.$refs.menu.save(time)
      },
    },
  }
</script>