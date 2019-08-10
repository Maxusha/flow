<template lang="pug">
  div(class="condition-conntetion" :class="value.line")
</template>

<script>
  export default {
    name: 'element-condition-arrow',
    props: {
      value: {
        type: Object // id, type: 'condition-arrow', line: 'first', 'intermediate', 'last', 'join'
      }
    }
  }
</script>

<style lang="scss">
  .condition-conntetion.first {
    &:before {
      width: 50%; position: absolute; top: 40px; height: 20px; border-right: 1px solid #bbbbbb; content: '';
    }
  }
  .condition-conntetion.last {
    &:before {
      width: 50%; position: absolute; top: 20px; height: 40px; border-right: 1px solid #bbbbbb; border-top: 1px solid #bbbbbb; content: '';
    }
  }
  .condition-conntetion.join {
    &:before {
      width: 100%; position: absolute; top: 20px; bottom: 30px; border-top: 1px solid #bbbbbb; content: '';
    }
  }
  .condition-conntetion.intermidiate {
    &:before {
      width: 50%; position: absolute; top: 20px; height: 40px; border-right: 1px solid #bbbbbb; border-top: 1px solid #bbbbbb; content: '';
    }
    &:after {
      width: 50%; position: absolute; top: 20px; right: 0; border-top: 1px solid #bbbbbb; content: '';
    }
  }
  // .connection.right-bottom.
</style>
