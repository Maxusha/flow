<template lang="pug">
  //- div(style="position: relative; height: 100%; display: inline-block;")
  div(:class="classObject" class="connection")
    div(class="height-modifier")
    div(class="width-modifier")
</template>

<script>
  export default {
    name: 'element-connection',
    props: {
      value: {
        type: Object
      }
    },
    data() {
      let val = this.value
      if (val.line === undefined) val.line = 'top-bottom'
      return val
    },
    computed: {
      classObject() {
        let c = [this.value.line]
        if (this.value.drawArrow) {
          c.push('arrow')
        }
        if (this.value.padLeft > 0) {
          c.push('pad-left-' + this.value.padLeft)
        }
        if (this.value.padTop > 0) {
          c.push('pad-top-' + this.value.padTop)
        }
        return c
      },
      styleObject() {
        let res = {}
        if (this.value.padLeft > 0) {
          if (this.value.line === 'top-bottom') {
            res['width'] = `calc(50% + ${this.value.padLeft * 10}px)`
          } else if (this.value.line === 'right-bottom') {
            res['left'] = `calc(50% + ${this.value.padLeft * 10 + 1}px)`
            res['width'] = `calc(50% - ${this.value.padLeft * 10 + 1}px)`
          }
        }
        return res
      }
    }
  }
</script>

<style lang="scss">
  .connection {
    // float: left;
    .width-modifier {
      float: left;
      min-width: 30px;
    }
    .height-modifier {
      float: left;
      min-height: 20px;
    }
  }
  .connection.top-bottom:before, .connection.bottom-top:before {
    top: 0; left: 0; width: 50%; height: 100%; border-right: 1px solid #bbbbbb; position: absolute; content: "";
  }
  .connection.top-right:before, .connection.right-top:before  {
    top: 0; left: calc(50% - 1px); width: calc(50% + 1px); height: 10px; border-left: 1px solid #bbbbbb; border-bottom: 1px solid #bbbbbb; position: absolute; content: "";
  }
  .connection.top-left:before {
    top: 0; left: 0; width: 50%; height: 10px; border-right: 1px solid #bbbbbb; border-bottom: 1px solid #bbbbbb; position: absolute; content: "";
  }
  .connection.left-right:before, .connection.right-left:before {
    top: 0; left: 0; width: 100%; height: 10px; border-bottom: 1px solid #bbbbbb; position: absolute; content: "";
  }
  .connection.right-bottom:before, .connection.bottom-right:before {
    top: 9px; left: calc(50% - 1px); width: calc(50% + 1px); height: calc(100% - 9px); border-left: 1px solid #bbbbbb; border-top: 1px solid #bbbbbb; position: absolute; content: "";
  }
  .connection.left-bottom:before, .connection.bottom-left:before {
    top: 9px; left: 0; width: 50%; height: calc(100% - 9px); border-right: 1px solid #bbbbbb; border-top: 1px solid #bbbbbb; position: absolute; content: "";
  }
  .connection.arrow:after {
    width: 0px;
    height: 0px;
    left: calc(50% - 5px);
    bottom: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #bbb;
    position: absolute;
    content: "";
  }
  @for $i from 1 through 10 {
    // cell resizers
    .connection.pad-top-#{$i} .height-modifier {
      min-height: 20px + ($i * 10);
    }
    .connection.pad-left-#{$i} .width-modifier {
      min-width: 30px + ($i * 10);
    }
    // lines pad top
    $pad-top: 9px + ($i * 10);
    .connection.right-bottom.pad-top-#{$i}:before, .connection.bottom-right.pad-top-#{$i}:before  {
      top: $pad-top;
      height: calc(100% - #{$pad-top});
    }
    .connection.left-bottom.pad-top-#{$i}:before, .connection.bottom-left.pad-top-#{$i}:before  {
      top: $pad-top;
      height: calc(100% - #{$pad-top});
    }
    .connection.top-left.pad-top-#{$i}:before, .connection.right-left.pad-top-#{$i}:before {
      height: 10px + $i * 10;
    }
    // lines pad left
    $pad-left: 0px + $i * 10;
    .connection.right-bottom.pad-left-#{$i}:before, .connection.bottom-right.pad-left-#{$i}:before {
      left: calc(50% + #{$pad-left});
      width: calc(50% - #{$pad-left});
    }
    .connection.left-bottom.pad-left-#{$i}:before, .connection.bottom-left.pad-left-#{$i}:before {
      width: calc(50% + #{$pad-left});
    }
    // arrows
    $arrow-pad: $i * 10 - 5px;
    .connection.arrow.pad-left-#{$i}:after {
      left: calc(50% + #{$arrow-pad});
    }
  }
</style>
