<script>
export default {
  props: {
    submit: Boolean,
    outlined: Boolean,
    disabled: Boolean,
    block: Boolean,
    loading: Boolean,
    icon: Boolean,
  },
  computed: {
    classes() {
        return {
          'btn': true,
          'btn--outlined': this.outlined,
          'btn--disabled': this.disabled,
          'btn--block': this.block,
          'btn--icon' : this.icon,
        };
      },
  },
  methods: {
    click: function click(e) {
      e.preventDefault();
      this.$emit('click', e);
    },
    genContent: function genContent() {
      return this.$createElement('span', {
        staticClass: 'btn__content'
      }, this.$slots.default)
    }
  },
  render: function(h) {
    const children = [this.genContent()]
    return h('button', {
      on: {
        click: this.click,
      },
      class: this.classes,
      attrs: {
        disabled: this.disabled,
        type: this.submit ? 'submit' : 'button',
      }
    }, children)
  }
}
</script>

<style>

</style>