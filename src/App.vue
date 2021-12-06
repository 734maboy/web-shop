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
          to="/"
        >
          WebShop
        </v-btn>
      </div>

      <v-spacer></v-spacer>


      <template v-if="!isLogged">
        <v-btn 
            color="secondary"
            class="mx-2"
            :to="'/signup'"
          >
            Регистрация
          </v-btn>
        <v-btn 
            color="secondary"
            class="mx-2"
            :to="'/signin'"
          >
            Авторизация
          </v-btn>
      </template>
      <template v-if="isLogged">
        <template v-if="!isAdmin && !isManager">
          <v-btn
            color="secondary"
            class="mx-2"
            :to="'/catalog'"
          >
            Каталог
          </v-btn>
        </template>
        <v-btn v-if="!isAdmin"
          color="secondary"
          class="mx-2"
          :to="'/user-orders'"
        >
          Заказы
        </v-btn>
        <template v-if="isAdmin || isManager">
          <v-btn
            color="secondary"
            class="mx-2"
            :to="'/edit-users'"
          >
            Пользователи
          </v-btn>
          <v-btn
            color="secondary"
            class="mx-2"
            :to="'/edit-products'"
          >
            Товары
          </v-btn>
        </template>
        <v-btn
          color="secondary"
          class="mx-2"
          @click="logOut"
        >
          Выйти
        </v-btn>
      </template>
      
    </v-app-bar>

    <v-container fluid fill-height style="padding: 0;">
      <v-main class="fill-height pt-15 px-0">
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
      this.$router.push('/signin');
    },
  },


  computed: {
    isLogged() {
      return this.$store.getters['user/isLogged'];
    },
    isAdmin() {
      return this.$store.getters['user/isAdmin'];
    },
    isManager() {
      return this.$store.getters['user/isManager'];
    },
  }

  


};
</script>
