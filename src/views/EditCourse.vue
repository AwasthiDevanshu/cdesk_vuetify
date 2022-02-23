<template>
  <v-container fluid tag="section">
    
    <v-row>
      <v-col class="adnot">
        <material-card
          icon="mdi-bell-ring"
          icon-small
          title="Edit Course"
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
                  <v-text-field
                    prepend-icon="mdi-hand-coin"
                    color="accent"
                    label="Price(in rupees)"
                    type="number"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-text-field
                    prepend-icon="mdi-currency-usd"
                    color="accent"
                    label="MRP(in rupees)"
                    type="number"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-text-field
                    prepend-icon="mdi-lock"
                    color="accent"
                    label="Course Validity(in days)"
                    type="number"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-text-field
                    prepend-icon="mdi-book-clock"
                    color="accent"
                    label="Duration(in minutes)"
                    type="number"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-text-field
                    prepend-icon="mdi-bookshelf"
                    color="accent"
                    label="Lecture Count"
                    type="number"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="6" lg="6">
                <v-select  prepend-icon="mdi-format-list-bulleted-type" :items="items" label="Course Type"></v-select>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                <v-select  prepend-icon="mdi-school" :items="items2" label="Promotion Type"></v-select>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="12" md="6" lg="6">
                  <v-select  prepend-icon="mdi-crosshairs-gps"  label=""></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6">
                <v-file-input
                  prepend-icon="mdi-paperclip"
                  label="Icon Image"
                  truncate-length="15"
                ></v-file-input>
                  </v-col>
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
    <!-- ></v-col
      ></v-row -->
  </v-container>
</template>

<script>
export default {
  name: "Edit Course",
  data: () => ({
      items: ['Online Course', 'Offline Course', 'Individual Course', 'Complete Course', 'Crash Course', 'Marathon Course'],
      items2: ['Normal', 'New', 'Popular', 'Top 10', 'Recommended'],
    }),
};
</script>