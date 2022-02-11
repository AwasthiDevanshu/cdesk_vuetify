<template>
  <div style="padding: 25px">
    <v-text-field
      label="Video Title"
      :rules="rules"
      hide-details="auto"
    />
    <v-text-field
      label="Url"
      :rules="rules"
      hide-details="auto"
    />
    <v-select
      :items="items"
      label="Course"
    />
    <v-text-field
      label="Class Time"
      :rules="rules"
      hide-details="auto"
      placeholder="DD/MM/YYYY"
    />
    <v-select
      :items="items"
      label="Category"
      placeholder="Select Category"
    />
    <v-select
      :items="items"
      label=" Sub-Category"
      placeholder="Select Sub-Category"
    />
    <v-row>
      <v-col
        class="text-right"
        cols="6"
      >
        <v-file-input
          accept="image/*"
          label="Thumbnail"
        />
      </v-col>
      <v-col
        class="text-right"
        cols="6"
      >
        <v-file-input
          multiple
          label="pdf"
        />
      </v-col>
    </v-row>
    <div>
      <v-row>
        <v-col
          class="text-right"
          cols="6"
        >
          <v-checkbox
            v-model="ex4"
            label="Enable Chat"
            value="red"
            hide-details
          />
        </v-col>
        <v-col
          class="text-right"
          cols="6"
        >
          <v-checkbox
            v-model="ex4"
            label="Paid Video"
            value="red"
            hide-details
          />
        </v-col>
      </v-row>
    </div>
    <div class="text-center">
      <v-btn
        elevation="4"
        outlined
        style="margin: 5rem"
        red
        large
        x-small
      >
        Submit
      </v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AddVideo',
    data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      rules: [
        (value) => !!value || 'Required.',
        (value) => (value && value.length >= 3) || 'Min 3 characters',
      ],
    }),
  }
</script>
