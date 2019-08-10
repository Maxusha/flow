<template lang="pug">
  .element.element-branch
    .branch(@mousedown.prevent="mousedown")
      .branch-left-triangle
      .branch-right-triangle
      .branch-text Branch
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