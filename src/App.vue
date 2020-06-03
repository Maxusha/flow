<template lang="pug">
#app
  Flow(v-model="data", :config="config", :components="components")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Flow from './components/Flow.vue'

import Start from './components/element-start.vue'
import End from './components/element-end.vue'
import Square from './components/element-square.vue'
import Branch from './components/element-branch.vue'
import Condition from './components/element-condition.vue'
import ConditionArrow from './components/element-condition-arrow.vue'
import { data1 } from './data'

@Component({
  name: 'app',
  data() {
    return {
      // TODO: Define interface of componet. Seems overcomplicated.
      // TODO: Customr components, conbination of behavior, validation of data based on provided component and behavior
      // TODO: Pass behavior.
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
})
export default class App extends Vue {}
</script>
