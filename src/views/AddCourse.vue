<template>
  <div id="only">
    <validation-observer
      ref="observer"
      v-slot="{ invalid }"
    >
      <form @submit.prevent="submit">
        <validation-provider
          v-slot="{ errors }"
          name="Title"
          rules="required|max:10"
        >
          <v-text-field
            v-model="name"
            :counter="10"
            :error-messages="errors"
            label="Price(in rupees)"
            required
          />
          <v-text-field
            v-model="name"
            :counter="10"
            :error-messages="errors"
            label="M.R.P(in rupees)"
            required
          />
          <v-select
            v-model="select"
            :items="items"
            :error-messages="errors"
            label="Course Validity(in days)"
            data-vv-name="select"
            required
          />
          <v-text-field
            v-model="name"
            :counter="10"
            :error-messages="errors"
            label="Duration"
            required
          />
          <v-text-field
            v-model="name"
            :counter="10"
            :error-messages="errors"
            label="Lecture Count"
            required
          />
          <v-select
            v-model="select"
            :items="items"
            :error-messages="errors"
            label="Course Type"
            data-vv-name="select"
            required
          />

          <v-select
            v-model="select"
            :items="items"
            :error-messages="errors"
            label="Promotion Type"
            data-vv-name="select"
            required
          />
        </validation-provider>
        <!-- <validation-provider
        v-slot="{ errors }"
        name="phoneNumber"
        :rules="{
          required: true,
          digits: 7,
          regex: '^(71|72|74|76|81|82|84|85|86|87|88|89)\\d{5}$'
        }"
      >
        <v-text-field
          v-model="phoneNumber"
          :counter="7"
          :error-messages="errors"
          label="Phone Number"
          required
        ></v-text-field>
      </validation-provider> -->
        <!-- <validation-provider
        v-slot="{ errors }"
        name="email"
        rules="required|email"
      >
        <v-text-field
          v-model="email"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
      </validation-provider> -->
        <!-- <validation-provider
        v-slot="{ errors }"
        name="select"
        rules="required"
      >

      </validation-provider> -->
        <v-btn
          class="mr-4"
          type="submit"
          :disabled="invalid"
        >
          submit
        </v-btn>
        <v-btn @click="clear">
          clear
        </v-btn>
      </form>
    </validation-observer>
  </div>
</template>

<script>
  import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
  import {
    extend,
    ValidationObserver,
    ValidationProvider,
    setInteractionMode,
  } from 'vee-validate'

  setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

  export default {
    name: 'AddCourse',
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      name: '',
      phoneNumber: '',
      email: '',
      select: null,
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
      checkbox: null,
    }),

    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.name = ''
        this.phoneNumber = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$refs.observer.reset()
      },
    },
  }
</script>
<style>
#only {
  padding: 25px;
}
</style>
