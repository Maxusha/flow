<template lang="pug">
  .element
    .box
      .start(@mousedown.prevent="mousedown") Start
    .connection-extender
</template>

<script>
  export default {
    name: 'element-start',
    props: ['value'],
  }
</script>

<style lang="scss">
  .element.selected {
    .box {
      div.start {
        background-color: #CBE8F6;
        border-color: #26A0DA;
      }
    }
  }
  .element .start {
    border: 1px solid #bbbbbb;
    border-radius: 20px;
    font-weight: bold;
    height: 40px;
    text-align: center;
    padding-top: 9px;
    min-width: 200px;
  }
</style>
