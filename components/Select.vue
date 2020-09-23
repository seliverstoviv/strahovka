<template>
  <div class="v-input v-input--select" :class="classes" @click="focusInput('select')">
    <div class="v-input__control">
      <label class="v-label" :for="id" v-if="label">{{ label }}</label>
      <multiselect
        ref="multiselect"
        :value="value"
        :options="options"
        :show-label="false"
        @open="setActive()"
        placeholder=""
        @close="disActive()"
        :label="labelMS"
        @input="$emit('input', $event)"
      >
        <span slot="noOptions">Отсутствуют параметры</span>
        <span slot="noResult">По вашему запросу ничего не найдено</span>
        </multiselect>
      <!-- <input
        ref="input"
        :type="number ? 'Number' : 'text'"
        :id="id"
        :placeholder="!label ? placeholder : ''"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @focus="setActive"
        @blur="disActive"> -->
    </div>
    <div class="v-input__details">
      <div class="v-input__desc sub-text" v-if="descr && !errors">{{ descr }}</div>
      <div class="v-input__errors sub-text" v-else-if="errors">{{ errors }}</div>
    </div>

  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import input from '@/mixins/global.js';

export default {
  props: {
    labelMS: {
      type: String,
      default: '',
    },
    number: Boolean,
    options: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      isDisabled: false,
      isTouched: false,
      value2: '',

    }
  },
  mixins: [input],
  components: {
    Multiselect,
  },
  methods: {
    focusSelect() {
      console.log(this.$refs.multiselect);
      this.$refs.multiselect.activate();
    },
    test(e) {
      console.log(e);
    },
  },
}
</script>

<style lang="scss">

</style>