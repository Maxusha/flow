<template lang="pug">
  .element
    .box(@mousedown.prevent="mousedown")
      .branch-left-triangle
      .branch-right-triangle
      .branch-text {{value.text}}
    .width-modifier
</template>

<script>
import base from './element-base.vue'

export default {
  extends: base,
  name: 'element-branch',
  props: ['value']
}
</script>