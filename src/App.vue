<template>
  <v-app>
    <v-app-bar
      dark
      app
      color="primary"
    >
      <div class="d-flex align-center">
        <v-btn
          depressed
          large
          text
          class="white--text"
        >
          WebShop
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <router-link
        v-for="route in routes"
        :key="route.path"
        :to="route.path">
          <v-btn 
            color="secondary"
            class="mx-2"
          >
            {{route.title}}
          </v-btn>
      </router-link>
      
      <v-btn
        v-if="isLogged"
        color="secondary"
        class="mx-2"
        @click="logOut"
      >
        Выйти
      </v-btn>
    </v-app-bar>

    <v-container fluid fill-height>
      <v-main class="fill-height">
        <router-view/>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import routes from './router/routes';

export default {
  name: 'App',

  data: () => ({
    routes: routes,
  }),

  created() {
    // this.$store.dispatch('user/getListOfRoles');
  },

  methods: {
    logOut() {
      this.$store.dispatch('user/logOut');
    },
  },


  computed: {
    isLogged() {
      return this.$store.getters['user/isLogged'];
    }
  }

  


};
</script>
