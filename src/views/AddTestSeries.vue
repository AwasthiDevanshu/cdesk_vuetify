<template>
  <v-container fluid tag="section">
   
    <v-row>
      <v-col class="adnot">
        <material-card
          icon="mdi-bell-ring"
          icon-small
          title="Add Test Series"
          color="accent"
          cols="12"
          sm="12"
          md="6"
          lg="6"
        >
          <div style="padding: 2rem">
            <v-form ref="form" v-model="valid">
              <v-row>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-text-field
                    v-model="name"
                    label="Title"
                    placeholder="Enter Test Series Title"
                    prepend-icon="mdi-feather"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-select
                    :items="items"
                    label="Test Series Type"
                    placeholder="Select Test Series Type"
                    prepend-icon="mdi-comma-box"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-text-field prepend-icon="mdi-currency-usd" color="accent" label="Price" type="number" />
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-file-input
                  prepend-icon="mdi-paperclip"
                    label="Icon Image"
                    truncate-length="15"
                  ></v-file-input>
                  </v-col
                >
              </v-row>
              <div id="submit" style="margin-top: 4rem" class="text-center">
                <v-btn
                  color="grey lighten-2"
                  text--white
                  @click="resetValidation"
                >
                  Submit
                </v-btn>
              </div>
            </v-form>
          </div>
        </material-card></v-col
      ></v-row
    >
    
  </v-container>
</template>
<script>
export default {
  name: "AddTestSeries",
  data: () => ({
    items: [
      "Free Test",
      "SSC",
      "Banking",
      "Insurance",
      "Defence",
      "UP State Level",
      "Teaching",
      "Railways",
      "Live Test(SRS)",
      "Topic Test",
      "UPSC",
      "Subject Test",
      "State PCS",
      "NEET",
      "IIT JEE",
      "UP Board",
      "CBSE Board",
      "PYP",
      "Class Test",
    ],
  }),
};
</script>

