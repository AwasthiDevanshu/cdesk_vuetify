<template>
  <v-footer padless>
    <v-col
    class="text-center white grey--text darken-4"
    cols="12"
    >
    <span>

     <strong><a class="grey--text">Coprepedu</a>&copy;</strong> - {{ new Date().getFullYear() }}
    </span>
       </v-col>
  </v-footer>
</template>

  <script>
  export default {
    name: 'BaseArea',
  }
</script>
