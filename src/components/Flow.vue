<template lang="pug">
div.flow-grid.mode-edit

  .row(v-for="(row, rowInd) in grid", style="display: flex; flex-direction: row nowrap;")
    .col(v-for="(col, colInd) in row", style="width: 200px; min-height: 20px; flex-direction: column; position: relative;")
      component(v-for="(elem, elemInd) in col" :key="elemInd" :is="getElementComponent(elem.type)" v-model="col[elemInd]")
  //- div(v-if="grid") {{columnWidth}}
  //- table(v-if="grid")
  //-   tr(v-for="(row, rowInd) in grid")
  //-     td(v-for="(col, colInd) in row")
  //-       //- div(v-if="rowInd % 2 === 1 && colInd % 2 === 1" style="display: flex; flex-direction:column;")
  //-       div(v-if="rowInd % 2 === 1 && colInd % 2 === 1" style="height: 100%;")
  //-         component(v-for="(elem, elemInd) in col" :key="elemInd" :is="getElementComponent(elem.type)" v-model="col[elemInd]")
  //-       div(v-else)
  //-         component(v-for="(elem, elemInd) in col" :key="elemInd" :is="getElementComponent(elem.type)" v-model="col[elemInd]")
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
    },
    columnWidth() {
      let extenders = Array(this.grid[0].length).fill(0)
      for (let [rowInd, row] of this.grid.entries()) {
        //console.log(row)
        for (let [colInd, cell] of row.entries()) {
          if (colInd % 2 === 1 && rowInd % 2 === 1) continue
          const cellMax = cell.reduce((max, elem) => {
            return max > elem.padLeft ? max : elem.padLeft  
          }, 0)
          extenders[colInd] = cellMax > extenders[colInd] ? cellMax : extenders[colInd]
        }
      }
      return extenders
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