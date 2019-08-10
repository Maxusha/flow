<template lang="pug">
  .element
    .box
      .square(@mousedown.prevent="mousedown") Square
</template>

<script>
import base from './element-base.vue'

export default {
  extends: base,
  name: 'element-square',
  props: ['value']
}
</script>

<style >
.element .square {
    border: 1px solid #bbbbbb;
    font-weight: bold;
    height: 40px;
    text-align: center;
    padding-top: 9px;
    min-width: 200px;
  }
</style>