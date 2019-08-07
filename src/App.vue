<template lang="pug">
#app
  Flow(v-model="data", :config="config", :components="components")
</template>

<script>
import Flow from './components/Flow.vue'
import Start from './components/element-start.vue'
import End from './components/element-end.vue'
import { data1 } from './data.js'

export default {
  name: 'app',
  data() {
    return {
      data: data1,
      config: {},
      components: [Start, End]
    }
  },
  mounted() {
  },
  components: {
    Flow
  }
}
</script>

<style>

</style>
