<template lang="pug">
  div.element.element-condition(@mousedown.stop="")
    div.condition(:class="value.order")
      div.condition-text(@mousedown.prevent="mousedown")
        div Condition
    div.connection-extender
</template>

<script>
import base from './element-base.vue'

export default {
  extends: base,
  name: 'element-condition',
  props: ['value']
}
</script>
