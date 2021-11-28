<template>
  <div class="vue-tempalte">
    <v-container>
      <select v-model="selected">
        <option disabled value="">Please select your role</option>
        <option>Student</option>
        <option>Teacher</option>
      </select>
      <span>Selected: {{ selected }}</span>
  </v-container>
  </div>
</template>

<script>
    export default {
      name: "login",
    }
</script>

<style scoped>
  
</style>