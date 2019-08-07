<template lang="pug">
  .element
    .box
      .start(@mousedown.prevent="mousedown") End
</template>

<script>
  export default {
    name: 'element-end',
    props: ['value']
  }
</script>

<style lang="scss">
  .element-end {
    border: 1px solid #bbbbbb;
    border-radius: 20px;
    font-weight: bold;
    height: 40px;
    text-align: center;
    padding-top: 9px;
    min-width: 200px;
  }
</style>
