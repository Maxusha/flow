<template lang="pug">
#app
  Flow(v-model="data", :config="config", :components="components")
</template>

<script>
import Flow from './components/Flow.vue'
import Start from './components/element-start.vue'
import End from './components/element-end.vue'
import Square from './components/element-square.vue'
import Branch from './components/element-branch.vue'
import Condition from './components/element-condition.vue'
import ConditionArrow from './components/element-condition-arrow.vue'
import { data1 } from './data.js'

export default {
  name: 'app',
  data() {
    return {
      data: data1,
      config: {},
      components: [Start, End, Square, Branch, Condition, ConditionArrow]
    }
  },
  mounted() {
  },
  components: {
    Flow
  }
}
</script>