<template>
  <div class="v-input" :class="classes" @click="focusInput">
    <div class="v-input__control">
      <label class="v-label" :for="id" v-if="label">{{ label }}</label>
      <br />
      <input
        ref="input"
        :type="number ? 'Number' : 'text'"
        :id="id"
        :placeholder="!label ? placeholder : ''"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @focus="setActive"
        @blur="disActive"
        @accept="accep2t($event)">
    </div>
    <div class="v-input__details">
      <div class="v-input__descr sub-text" v-if="descr && !errors">{{ descr }}</div>
      <div class="v-input__errors sub-text" v-else-if="errors && error">{{ errors }}</div>
    </div>
  </div>
</template>
<script>
import input from '@/mixins/global.js';
export default {
  props: {
    number: Boolean,
  },
  mixins: [input],
}
</script>