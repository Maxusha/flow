<template lang="pug">
  .element.element-condition
    .box
      .condition-text(@mousedown.prevent="mousedown")
        div {{value.text}}
    .connection-extender
</template>

<script>
import base from './element-base.vue'

export default {
  extends: base,
  name: 'element-condition',
  props: ['value']
}
</script>
