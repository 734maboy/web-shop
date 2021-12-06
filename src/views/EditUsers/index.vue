<template>
  <v-layout>
    <data-table
      :headers="headers"
      :title="'Пользователи'"
      :items="users"
      :editProperties="['id', 'login', 'password', 'role', 'name', 'code', 'address', 'discount']"
      @resetFields="resetFields"
      @fillData="fillData"
      @saveItem="save"
      @addItem="addNewUser"
      @deleteItem="deleteItem"
    >
      <template #fields>
        <v-text-field
          v-model="editedItem.login"
          label="Логин"
        ></v-text-field>
        <v-text-field
          v-model="editedItem.password"
          label="Пароль"
        ></v-text-field>
        <v-select
          v-model="editedItem.role"
          :items="roles"
        >
        </v-select> 
        <template v-if="editedItem.role == 'Заказчик'">
          <v-text-field
            v-model="editedItem.name"
            label="ФИО"
          />
          <v-text-field
            v-model="editedItem.address"
            label="Адрес"
          />
          <v-text-field
            v-model="editedItem.discount"
            type="number"
            label="Скидка"
          />
        </template>          
      </template>
    </data-table> 
  </v-layout>
</template>

<script>
import DataTable from '@/components/helpers/DataTable.vue';


export default {
  components: {
    DataTable,
  },

  data: () => ({
    dialog: false,
    headers: [
      { text: 'id', value: 'id' },
      { text: 'login', value: 'login' },
      { text: 'password', value: 'password' },
      { text: 'role', value: 'role' },
      { text: 'name', value: 'name' },
      { text: 'code', value: 'code' },
      { text: 'address', value: 'address' },
      { text: 'discount', value: 'discount' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedItem: {
        id: '',
        login: '',
        password: '',
        role: '',
        name: '',
        code: '',
        address: '',
        discount: 0,
    },
    defaultItem: {
        id: '',
        login: '',
        password: '',
        role: '',
        name: '',
        code: '',
        address: '',
        discount: 0,
    },
  }),


  methods: {
    resetFields() {
      this.editedItem = Object.assign({}, this.defaultItem);
    },

    fillData(item) {
       (item);
      this.editedItem = item;
    },

    save() {
      this.$store.dispatch('admin/updateUser', this.editedItem);
    },

    deleteItem(item) {
      this.$store.dispatch('admin/removeUserFromList', item);
    },

    addNewUser() {
      this.$store.dispatch('admin/createNewUser', this.editedItem);
    }
  },

  computed: {
    roles() {
      return this.$store.getters['user/getListOfRoles'].map( item => item.roleName);
    },
    users() {
        return (this.$store.getters['admin/getUsersList']).map( item => {
          let user = {
            id: item.id,
            login: item.login,
            password: item.password,
            role: item.role.roleName,
          };
          if (item.customer) {
            user.name = item.customer.name;
            user.code = item.customer.code;
            user.address = item.customer.address;
            user.discount = item.customer.discount;
          }
          return user; 
        });
      }
  },
}
</script>