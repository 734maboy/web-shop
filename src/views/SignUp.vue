<template>
  <v-layout
    column
    justify-center
    align-center
    fill-height
  >
    <form-base
      :minWidth="'500'"
      ref="signUpForm"
      @submit.prevent="logIn"
    >
      <template #title>
        <h1 class="my-3" >Регистрация</h1>
      </template>
      <v-text-field
        v-model="userInfo.login"
        :rules="[rules.required, rules.min('login'), rules.max('login')]"
        label="Логин"
        tabindex="1"
        clearable
        outlined
        counter
        dense
      />
      <v-text-field
        v-model="userInfo.password"
        :rules="[rules.required, rules.min('password'), rules.max('password')]"
        type="password"
        label="Пароль"
        tabindex="2"
        outlined
        counter
        dense
      />
      <v-text-field
        v-model="userInfo.surname"
        :rules="[rules.required, rules.min('name'), rules.max('name')]"
        label="Фамилия"
        tabindex="3"
        clearable
        outlined
        counter
        dense
      />
      <v-text-field
        v-model="userInfo.name"
        label="Имя"
        :rules="[rules.required, rules.min('name'), rules.max('name')]"
        tabindex="4"
        clearable
        outlined
        counter
        dense
      />
      <v-text-field
        v-model="userInfo.fname"
        :rules="[rules.required, rules.min('name'), rules.max('name')]"
        label="Отчество"
        tabindex="5"
        clearable
        outlined
        counter
        dense
      />
      <v-text-field
        v-model="userInfo.address"
        :rules="[rules.required, rules.min('address'), rules.max('address')]"
        label="Адрес"
        tabindex="6"
        outlined
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
								Регистрация
							</v-btn>
						</v-col>
					</v-row>
      </template>
    </form-base>
  </v-layout>
</template>

<script>
import FormBase from '../components/FormBase.vue';

export default {
  name: 'SignUp',
  components: {
    FormBase,
  },

  data: () => ({
    userInfo: {
      login: '',
      password: '',
      surname: '',
      name: '',
      fname: '',
      address: '',
    }
  }),

  methods: {
    async logIn() {
      let {status = 400, message = '' } = await this.$store.dispatch('user/requestToCreateNewUser', this.userInfo);
      if (status == 200) {
        this.$refs.signUpForm.resetForm();
      } else {
        this.$refs.signUpForm.setAlert(message);
      }
      
    },
  },

  computed: {
    rules() {
      return this.$store.getters['getRules'];
    },
  }

}
</script>