<template>
  <div class="container">
    <Forms></Forms>
  </div>
</template>

<script>


import { required, minLength, between, email } from 'vuelidate/lib/validators'

export default {
  
  data() {
    return {
      mask: {
          mask: '{8}000000',
          lazy: false
      },
      values: '',
      value2: '2',
      options: ['list', 'of', 'options'],
    }
  },
}
</script>
<style>

</style>
