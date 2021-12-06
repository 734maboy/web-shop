<template>
  <v-layout
    justify-center
    align-center
    fill-height
    column
  >
    <form-base
      :minWidth="'500'"
      ref="signInForm"
      @submit.prevent="logIn"
    >
      <template #title> 
          <h1 class="my-3"> Авторизация </h1>
      </template>
      <v-text-field
        v-model="login"
        :rules="[rules.required, rules.min('address')]"
        label="Логин"
        tabindex="1"
        outlined
        dense
      />
      <v-text-field
        v-model="password"
        :rules="[rules.required, rules.min('address')]"
        type="password"
        label="Пароль"
        tabindex="2"
        outlined
        password
        dense
      />
      <template #actions> 
        <v-row>
          <v-col align="center">
            <v-btn
              	type="submit"
								class="white--text align-self-center"
								color="primary"
            >
              Войти
            </v-btn>
          </v-col>  
        </v-row>
      </template>
    </form-base>
  </v-layout>
</template>

<script>
import FormBase from '../components/FormBase.vue';

export default ({
  name: 'SignIn',
  components: {
    FormBase,
  },

  data: () => ({
    login: '',
    password: '',
  }),

  methods: {
    async logIn() {
      let { message = undefined } = await this.$store.dispatch('user/requestToLogInUser', {
        login: this.login,
        password: this.password,
      });
      if (message != undefined) {
        this.$refs.signInForm.setAlert(message);
      } else {
        this.$router.push('/');
        this.$refs.signInForm.resetForm();
      }
    },
  },

  computed: {
    rules() {
      return this.$store.getters['getRules'];
    }
  }

})
</script>
