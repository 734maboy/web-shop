<template>
  <form-validate ref="form" @submit="handleSubmit" @fail-validation="hadleFailValidation">
    <v-card 
			elevation="0"
			:max-width="maxWidth"
			:min-width="minWidth"
			>
      <v-card-title class="pa-0">
        <v-layout column>
          <v-layout justify-center>
            <slot name="title">
              <span
                class="font-weight-regular"
                :class="{ 'pa-4' : title }"
              >{{ title }}</span>
            </slot>
          </v-layout>

					<v-flex xs12>
						<v-slide-y-transition>
							<v-alert
								v-if="message"
								style="width:100%"
								class="mb-0 mt-3"
								border="top"
								:type="typeAlert"
								:color="typeAlert"
								dark
							> 
								{{ message }} 
							</v-alert>
						</v-slide-y-transition>
					</v-flex>
					
          <v-divider />
        </v-layout>
      </v-card-title>

      <v-card-text class="mt-4 pb-0">
        <slot></slot>
      </v-card-text>

      <v-card-actions >
				<slot name="actions"></slot>
      </v-card-actions>
			<slot name="afterTitle">
			<span class="caption secondary--text cursor--pointer change-form-button" @click="$emit('after-title-action')">
				{{ afterTitle }}
			</span>
			</slot>
    </v-card>
  </form-validate>
</template>

<script>
/**
 * Компонент формы
 */

import FormValidate from './FormValidate';

export default {
  name: 'FormBase',

  components: {
    FormValidate,
  },

  props: {
    afterTitle: String,
		title: String,
		maxWidth: {
			type: String || Number,
			default: '500px',
		},

		minWidth: {
			type: String || Number,
			default: 'auto',
		},
  },

  data: () => ({
		message: '',
		typeAlert: 'info',
  }),

  methods: {
    hadleFailValidation(e) {
			this.typeAlert = 'error'
      this.message = 'Проверьте правильность заполнения полей';
			return this.$emit('fail-validation', e);
    },
    handleSubmit(e) {
			this.typeAlert = 'info';
			this.message = '';
			return this.$emit('submit', e);
    },

    setAlert(message, type = 'error') {			
			this.typeAlert = type;
			this.message = message;
			return; 
		},

		resetValidation() {
			this.$refs.form.resetValidation();
			this.message = '';
		},
		resetForm() {
			this.$refs.form.resetForm();
			this.message = '';
		},
	},
};
</script>