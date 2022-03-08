<template>
  <div id="only">
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <!-- <validation-provider
          v-slot="{ errors }"
          name="Title"
          rules="required|max:10"
        > -->
        <v-row>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-text-field
              v-model="name"
              :counter="10"
              :error-messages="errors"
              label="Title"
              required
          /></v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-text-field
              v-model="price"
              :counter="10"
              type="number"
              :error-messages="errors"
              label="Price(in rupees)"
              required
          /></v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-text-field
              v-model="mrp"
              :counter="10"
              type="number"
              :error-messages="errors"
              label="M.R.P(in rupees)"
              required
          /></v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-text-field
              v-model="Cval"
              :counter="10"
              type="number"
              :error-messages="errors"
              label="Course Validity(in days)"
              required /></v-col
        ></v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-text-field
              v-model="Duration"
              :counter="10"
              type="number"
              :error-messages="errors"
              label="Duration(in mins)"
              required
          /></v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-text-field
              v-model="LecCount"
              :counter="10"
              type="number"
              :error-messages="errors"
              label="Lecture Count"
              required /></v-col
        ></v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-select
              v-model="select"
              :items="items"
              :error-messages="errors"
              label="Course Type"
              data-vv-name="select"
              required
            />
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6">
            <v-select :items="items2" label="Promotion Type"></v-select> </v-col
        ></v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-select :items="items" label="Course Type"></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-select label="Select Option"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-file-input
              prepend-icon=""
              false
              accept="image/*"
              label="Thumbnail"
            ></v-file-input>
          </v-col>
        </v-row>

        <!-- </validation-provider> -->
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
        <v-row style="margin-top: 3rem"
          ><v-btn class="mr-4" type="submit" :disabled="invalid">
            submit
          </v-btn>
          <v-btn @click="clear"> clear </v-btn></v-row
        >
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  name: "AddCourse",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    name: "",
    price: "",
    mrp: "",
    Cval: "",
    Duration: "",
    LecCount: "",

    phoneNumber: "",
    email: "",
    select: null,
    items: [
      "Online Course",
      "Offline Course",
      "Individual Course",
      "Complete Course",
      "Crash Course",
      "Marathon Course",
    ],
    items2: ["Normal", "New", "Popular", "Top 10", "Recommended"],
    checkbox: null,
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    clear() {
      this.name = "";
      this.phoneNumber = "";
      this.email = "";
      this.select = null;
      this.checkbox = null;
      this.$refs.observer.reset();
    },
  },
};
</script>
<style>
#only {
  padding: 25px;
}
</style>
