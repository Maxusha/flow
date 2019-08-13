<template lang="pug">
  .element
    .box
      .condition-text(@mousedown.prevent="mousedown") {{value.text}}
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
