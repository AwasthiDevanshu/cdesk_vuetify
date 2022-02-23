<template>
  <v-container fluid tag="section">
    <v-row>
      <v-col class="adnot">
        <material-card
          icon="mdi-bell-ring"
          icon-small
          title="Add Time Table"
          color="accent"
          cols="12"
          sm="12"
          md="6"
          lg="6"
        >
          <div style="padding: 2rem">
            <v-form ref="form" v-model="valid">
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-textarea
                    solo
                    color="accent"
                    style="margin-right: 2rem"
                    label="Add Time Table"
                    placeholder="Add Text Here"
                    prepend-icon="mdi-time"
                  ></v-textarea>
                </v-col>
              </v-row>

              <div id="submit" style="margin-top: 3rem" class="text-center">
                <v-btn
                  color="grey lighten-4"
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
  name: "Add Time Table",
};
</script>