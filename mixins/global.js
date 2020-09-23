export default {
  props: ['value', 'errors', 'descr', 'placeholder', 'label', 'error'],
  data() {
    return {
      id: '',
      active: false,
    }
  },
  methods: {
    focusInput(el) {
      if (el === 'select') {
        this.$refs.multiselect.activate();
        return;
      }
      this.$refs.input.focus();
    },
    setActive() {
      this.active = true;
    },
    disActive() {
      this.active = false;
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
  },
  computed: {
    classes() {
      return {
        'v-input--active': this.active || this.value,
        'v-input--errors': this.error,
        'v-input--focus': this.active,
      };
    }
  },
  created () {
    this.id =  `input-${this.getRandomInt(0, 100)}${this.getRandomInt(0, 100)}`;
  },
}