<template lang="pug">
div.flow-grid.mode-edit
  table(v-if="grid")
    tr(v-for="(row, rowInd) in grid")
      td(v-for="(col, colInd) in row")
        div(v-if="rowInd % 2 === 1 && colInd % 2 === 1" style="display: flex; flex-direction:column;")
          component(v-for="(elem, elemInd) in col" :key="elemInd" :is="getElementComponent(elem.type)" v-model="col[elemInd]")
        div(v-else)
          component(v-for="(elem, elemInd) in col" :key="elemInd" :is="getElementComponent(elem.type)" v-model="col[elemInd]")
</template>

<script>
import Connection from './element-connection.vue'
import { ElementType } from '../utils/behavior.js'
import { MakeGrid } from '../utils/grid.js'
import '@/style.scss'

export default {
  name: 'flow',
  model: {
    prop: 'elements',
    event: 'change'
  },
  props: {
    elements: Array,
    config: Object,
    components: Array
  },
  computed: {
    grid() {
      return this.elements ? MakeGrid(this.elements) : null
    },
    componentsMerged() {
      return this.components.reduce((a, c) => {
        a[c.name] = c
        return a
      }, this.$options.components)
    }
  },
  methods: {
    getElementComponent(name) {
      const component = this.componentsMerged[name]
      if (!component) throw new Error(`Element type "${name}" can't be rendered. Because there is no component with this name provided.`)
      return component
    }
  },
  watch: {
    config() {
      //  
    }
  },
  components: {
    [ElementType.CONNECTION]: Connection
  }
}
</script>