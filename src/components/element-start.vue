<template lang="pug">
  .element
    .box
      .rounded(@mousedown.prevent="mousedown") Start
    .connection-extender
</template>

<script>
import base from './element-base.vue'

export default {
  extends: base,
  name: 'element-start',
  props: ['value'],
}
</script>

<style lang="scss">
  // .element.selected {
  //   .box {
  //     div.start {
  //       background-color: #CBE8F6;
  //       border-color: #26A0DA;
  //     }
  //   }
  // }
  .element .rounded {
    border: 1px solid #bbbbbb;
    border-radius: 20px;
    font-weight: bold;
    height: 40px;
    text-align: center;
    padding-top: 9px;
    min-width: 200px;
  }
</style>
